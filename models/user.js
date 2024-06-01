// Importing required modules from Mongoose
const { Schema, model } = require('mongoose');

// Defining the User schema with required fields and their respective data types
const userSchema = new Schema(
  {
    // The username of the user, required, unique, and trimmed
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // The email of the user, required, unique, and validated using a regular expression
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        }
      }
    },
    // Array of user IDs representing friends, referencing the 'User' model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    // Array of thought IDs associated with the user, referencing the 'Thought' model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }
    ],
  },
  // Additional schema options
  {
    // Enables virtual properties when converting to JSON format
    toJSON: {
      virtuals: true,
    },
    // Disables the default '_id' field in the User model
    id: false,
  }
);

// Defining a virtual property 'friendCount' to calculate the number of friends for a user
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Creating the 'User' model from the userSchema
const User = model('User', userSchema);

// Exporting the 'User' model as a module
module.exports = User;
