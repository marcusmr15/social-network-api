const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  deleteThought,
  updateThoughtById,
  createReaction,
  deleteReaction,
  getThoughtsByUser,
  getAllReactions
} = require('../../controllers/thought-controller');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtsById)
  .put(updateThoughtById)
  .delete(deleteThought);

router.route('/user/:userId')
  .get(getThoughtsByUser);

router.route('/:thoughtId/reactions')
  .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

// Define route for GET all reactions
router.route('/reactions/all')
  .get(getAllReactions);

module.exports = router;
