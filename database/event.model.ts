import mongoose, { Schema, Model, Document } from "mongoose";

// Interface defining the structure of an Event document
interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface for the Event model with static methods
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IEventModel extends Model<IEvent> {
  // Future static methods can be added here
}

// Event schema with all required fields and validation
const EventSchema: Schema<IEvent> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [1, "Event title cannot be empty"],
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      minlength: [1, "Event description cannot be empty"],
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
      minlength: [1, "Event overview cannot be empty"],
    },
    image: {
      type: String,
      required: [true, "Event image is required"],
      trim: true,
      minlength: [1, "Event image cannot be empty"],
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
      minlength: [1, "Event venue cannot be empty"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
      minlength: [1, "Event location cannot be empty"],
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
      trim: true,
      minlength: [1, "Event date cannot be empty"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
      trim: true,
      minlength: [1, "Event time cannot be empty"],
    },
    mode: {
      type: String,
      required: [true, "Event mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be either online, offline, or hybrid",
      },
    },
    audience: {
      type: String,
      required: [true, "Event audience is required"],
      trim: true,
      minlength: [1, "Event audience cannot be empty"],
    },
    agenda: {
      type: [String],
      required: [true, "Event agenda is required"],
      validate: {
        validator: function (agenda: string[]) {
          return agenda.length > 0;
        },
        message: "Event agenda cannot be empty",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
      minlength: [1, "Event organizer cannot be empty"],
    },
    tags: {
      type: [String],
      required: [true, "Event tags are required"],
      validate: {
        validator: function (tags: string[]) {
          return tags.length > 0;
        },
        message: "Event tags cannot be empty",
      },
    },
  },
  {
    timestamps: true, // Enable automatic createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Pre-save hook to generate slug from title and normalize date/time
EventSchema.pre("save", async function () {
  const event = this as IEvent;

  // Generate slug from title if title is modified or slug doesn't exist
  if (event.isModified("title") || !event.slug) {
    // Convert title to URL-friendly slug
    event.slug = event.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();

    // Ensure slug is not empty after processing
    if (!event.slug) {
      event.slug = `event-${Date.now()}`;
    }
  }

  // Normalize date to ISO format if date is modified
  if (event.isModified("date") && event.date) {
    try {
      // Attempt to parse and normalize to date
      const parsedDate = new Date(event.date);
      if (!isNaN(parsedDate.getTime())) {
        event.date = parsedDate.toISOString().split("T")[0]; // Keep only date part
      }
    } catch {
      // If date parsing fails, keep original value
      console.warn("Failed to normalize date:", event.date);
    }
  }

  // Normalize time format if time is modified
  if (event.isModified("time") && event.time) {
    // Basic time format validation and normalization
    const timeRegex =
      /^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/;
    if (!timeRegex.test(event.time)) {
      console.warn("Time format may be inconsistent:", event.time);
    }
  }
});

// Note: slug field already has unique: true which creates an index automatically

// Create the Event model, preventing model redefinition
const Event: IEventModel =
  mongoose.models.Event ||
  mongoose.model<IEvent, IEventModel>("Event", EventSchema);

export { Event };
export type { IEvent, IEventModel };

