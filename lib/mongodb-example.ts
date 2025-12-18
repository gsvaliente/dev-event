// Example usage of the MongoDB connection
// This file demonstrates how to use the lib/mongodb.ts connection

import { connectToDatabase, isDatabaseConnected } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Example schema definition
const ExampleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create or get the model (prevents redefining the model)
const ExampleModel = mongoose.models.Example || mongoose.model('Example', ExampleSchema);

/**
 * Example function that demonstrates database usage
 */
export async function exampleDatabaseOperation() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Check connection status
    if (!isDatabaseConnected()) {
      throw new Error('Database is not connected');
    }
    
    // Example: Create a new document
    const newDocument = new ExampleModel({
      name: 'Test Document',
    });
    
    await newDocument.save();
    console.log('Document saved successfully');
    
    // Example: Find documents
    const documents = await ExampleModel.find({});
    console.log('Found documents:', documents);
    
    return documents;
    
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}

/**
 * Example API route usage
 * This would typically be used in app/api/example/route.ts
 */
export async function GET() {
  try {
    await connectToDatabase();
    
    const data = await ExampleModel.find({});
    
    return Response.json({ 
      success: true, 
      data,
      connectionStatus: isDatabaseConnected() 
    });
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}