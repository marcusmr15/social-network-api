// Importing required modules from Mongoose
const { Schema, model } = require('mongoose'); 

// Importing the reaction schema
const reactionSchema = require('./reaction');

// Defining the thought schema
const thoughtSchema = new Schema(
    {
        // The text content of the thought, required and limited to 1-280 characters
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280, // Corrected typo: maxlenght -> maxlength
        },
        // The timestamp of when the thought was created, defaulting to the current date
        createdAt:{
            type: Date,
            default: Date.now,
            // Custom getter to format the timestamp
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        // The username of the user who created the thought
        username:{
            type: String,  
            required: true,
        },
        // Array of reaction objects associated with the thought, using the reaction schema
        reactions:[reactionSchema],
    },
    // Additional schema options
    {
        // Including virtual properties when converting to JSON
        toJSON: {
            getters: true,
            virtuals: true,
        },
        // Disabling the virtual '_id' property
        id: false,
    }
);

// Virtual property to calculate the number of reactions for a thought
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Creating the 'Thought' model from the thought schema
const Thought = model('Thought',thoughtSchema)

// Exporting the 'Thought' model as a module
module.exports = Thought
