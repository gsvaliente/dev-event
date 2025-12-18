import mongoose, { Schema, Model, Document } from 'mongoose';

// Interface defining the structure of a Booking document
interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for the Booking model with static methods
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IBookingModel extends Model<IBooking> {
  // Future static methods can be added here
}

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Booking schema with reference validation and email validation
const BookingSchema: Schema<IBooking> = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required'],
    index: true // Index for faster queries by eventId
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email: string) {
        return emailRegex.test(email);
      },
      message: 'Please provide a valid email address'
    }
  }
}, {
  timestamps: true, // Enable automatic createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save hook to validate that the referenced Event exists
BookingSchema.pre('save', async function() {
  const booking = this as IBooking;
  
  // Only validate on new bookings or when eventId is modified
  if (booking.isNew || booking.isModified('eventId')) {
    try {
      // Check if the referenced Event exists
      const Event = mongoose.model('Event');
      const eventExists = await Event.exists({ _id: booking.eventId });
      
      if (!eventExists) {
        throw new Error('Referenced event does not exist');
      }
    } catch (error) {
      // Re-throw with a more descriptive message
      throw new Error(`Failed to validate event reference: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
});

// Create unique index to prevent duplicate bookings for same event and email
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Create the Booking model, preventing model redefinition
const Booking: IBookingModel = mongoose.models.Booking || mongoose.model<IBooking, IBookingModel>('Booking', BookingSchema);

export { Booking };
export type { IBooking, IBookingModel };