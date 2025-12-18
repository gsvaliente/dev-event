import mongoose from 'mongoose';

// Validate environment variable at module level
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Global type declaration for development caching
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend global type for development caching
declare global {
  var mongoose: CachedConnection | undefined;
}

// Connection options for production-ready setup
const connectionOptions: mongoose.ConnectOptions = {
  // Buffer commands until connection is established
  bufferCommands: true,
  // Server selection timeout (5 seconds)
  serverSelectionTimeoutMS: 5000,
  // Enable retryable writes for better reliability
  retryWrites: true,
  // Use modern connection string parser
  // Note: useNewUrlParser and useUnifiedTopology are deprecated in mongoose 6+
};

/**
 * Establishes and caches MongoDB connection using Mongoose
 * 
 * Features:
 * - Connection caching to prevent multiple connections in development
 * - Proper TypeScript typing without using 'any'
 * - Environment variable validation
 * - Production-ready connection options
 * - Error handling and logging
 * 
 * @returns Promise<typeof mongoose> - Active MongoDB connection
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // Check if we already have a cached connection
  if (global.mongoose?.conn) {
    console.log('Using cached MongoDB connection');
    return global.mongoose.conn;
  }

  // Check if there's a connection promise in progress
  if (global.mongoose?.promise) {
    console.log('Waiting for existing MongoDB connection promise');
    return global.mongoose.promise;
  }

  try {
    // Create new connection promise
    const connectionPromise = mongoose.connect(MONGODB_URI as string, connectionOptions);
    
    // Cache the promise globally (for development)
    if (!global.mongoose) {
      global.mongoose = { conn: null, promise: null };
    }
    global.mongoose.promise = connectionPromise;

    console.log('Establishing new MongoDB connection...');
    
    // Wait for connection to establish
    const connection = await connectionPromise;
    
    // Cache the connection globally
    global.mongoose.conn = connection;
    
    // Set up connection event listeners for better debugging
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (error: Error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      // Reset cached connection on disconnect
      if (global.mongoose) {
        global.mongoose.conn = null;
        global.mongoose.promise = null;
      }
    });

    // Handle application termination gracefully
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return connection;
    
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    
    // Reset cached connection on error
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }
    
    throw new Error(`MongoDB connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Utility function to check if MongoDB is connected
 * @returns boolean - Connection status
 */
export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * Utility function to get current connection state
 * @returns number - Connection ready state (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)
 */
export function getConnectionState(): number {
  return mongoose.connection.readyState;
}

/**
 * Gracefully closes MongoDB connection
 * @returns Promise<void>
 */
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed successfully');
    
    // Reset global cache
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

// Export the default connection for convenience
export default mongoose.connection;