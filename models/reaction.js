// Importing required modules from Mongoose
const { Schema, Types } = require('mongoose');

// Defining the reaction schema
const reactionSchema = new Schema(
  {
    // Unique identifier for the reaction, automatically generated if not provided
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // The body of the reaction, limited to 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    // The username of the user who created the reaction
    username: {
      type: String,
      required: true,
    },
    // The timestamp of when the reaction was created, defaulting to the current date
    createdAt: {
      type: Date,
      default: Date.now,
      // Custom getter to format the timestamp
      get: timestamp => new Date(timestamp).toLocaleDateString()
    },
  },
  // Additional schema options
  {
    // Including virtual properties when converting to JSON
    toJSON: {
      getters: true,
    },
    // Disabling the virtual '_id' property
    id: false,
  }
);

// Exporting the reaction schema as a module
module.exports = reactionSchema;
