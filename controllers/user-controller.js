// Importing required models
const { User } = require('../models');

// Define the UserController object, which contains methods for handling various API requests related to users
const UserController = {
  // Handler for the "get all users" API endpoint
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // Handler for the "get user by ID" API endpoint
  getUserById(req, res) {
    User.findById(req.params.userId)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // Handler for the "create user" API endpoint
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // Handler for the "update user by ID" API endpoint
  updateUserById(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },

  // Handler for the "delete user" API endpoint
  deleteUserById(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      })
      .catch(err => res.status(500).json(err));
  },

  // Handler for the "add friend" API endpoint
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId } },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },

  // Handler for the "remove friend" API endpoint
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Check if friend was removed
        const removed = !dbUserData.friends.includes(req.params.friendId);
        // Return response with appropriate message
        if (removed) {
          res.json({ message: 'Friend removed successfully!', dbUserData });
        } else {
          res.json(dbUserData);
        }
      })
      .catch(err => res.status(400).json(err));
  },
};

// Export UserController
module.exports = UserController;
