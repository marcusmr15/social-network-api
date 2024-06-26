// Importing required models
const { Thought, User } = require('../models');

// Define the ThoughtController object, which contains methods for handling various API requests related to thoughts
const ThoughtController = {
  // Handler for the "get all thoughts" API endpoint
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "get all reactions" API endpoint
  async getAllReactions(req, res) {
    try {
      const thoughts = await Thought.find({});
      const allReactions = thoughts.reduce((reactions, thought) => {
        return reactions.concat(thought.reactions);
      }, []);
      res.json(allReactions);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "get thought by ID" API endpoint
  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Method to get thoughts by user ID
  async getThoughtsByUser(req, res) {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(user.thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "create thought" API endpoint
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "delete thought" API endpoint
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "update thought by ID" API endpoint
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "create reaction" API endpoint
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Handler for the "delete reaction" API endpoint
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

// Export ThoughtController
module.exports = ThoughtController;

