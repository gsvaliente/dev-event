// Export Event and Booking models for easy import throughout the application
export { Event } from './event.model';
export { Booking } from './booking.model';

// Export TypeScript interfaces for type safety in consuming code
export type { IEvent, IEventModel } from './event.model';
export type { IBooking, IBookingModel } from './booking.model';