// Importing necessary dependencies and controllers
const router = require('express').Router();
const {
  // Importing thought controller functions
  getAllThoughts,
  getThoughtsById,
  createThought,
  deleteThought,
  updateThoughtById,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// Define routes for GET and POST all Thoughts
router.route('/')
  .get(getAllThoughts) // GET request to fetch all thoughts
  .post(createThought); // POST request to create a new thought

// Define routes for GET, PUT, and DELETE Thoughts by ID
router.route('/:thoughtId')
  .get(getThoughtsById) // GET request to fetch a thought by its ID
  .put(updateThoughtById) // PUT request to update a thought by its ID
  .delete(deleteThought); // DELETE request to delete a thought by its ID

// Define route for POST reaction to a Thought
router.route('/:thoughtId/reactions')
  .post(createReaction); // POST request to add a reaction to a thought

// Define route for DELETE reaction from a Thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); // DELETE request to remove a reaction from a thought

// Exporting the router
module.exports = router;
