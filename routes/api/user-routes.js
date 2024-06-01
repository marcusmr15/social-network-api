// Importing necessary dependencies and controllers
const router = require('express').Router();
const {
  // Importing user controller functions
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// Define routes for GET and POST all users
router.route('/')
  .get(getAllUsers) // GET request to fetch all users
  .post(createUser); // POST request to create a new user

// Define routes for GET, PUT, and DELETE users by ID
router.route('/:userId')
  .get(getUserById) // GET request to fetch a user by their ID
  .put(updateUserById) // PUT request to update a user by their ID
  .delete(deleteUserById); // DELETE request to delete a user by their ID

// Define route for POST add friend and DELETE remove Friend
router.route('/:userId/friends/:friendId')
  .post(addFriend) // POST request to add a friend to a user
  .delete(removeFriend); // DELETE request to remove a friend from a user

// Exporting the router
module.exports = router;
