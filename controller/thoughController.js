const { User, Thought } = require('../model');

module.exports = {
    async allThoughts (req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },

    async singleThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});

            if(!thought) {
                res.status(400).json({ message: "There is no Thought with this ID!"})
            } else {
                res.status(200).json(thought)
            }
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.params},
                {$push: {thoughts: thought._id}},
                {new: true}
            );

            if(!user) {
                res.status(400).json({ message: "Thought created, but there was no user with this ID!"})
            } else {
                res.status(200).json({message: "Thought was created!"})
            }
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },

    async updateThought (req, res) {
        try {
            const newThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true}
            );

            if(!newThought) {
                res.status(400).json({ message: "There is no thought with this ID!"})
            } else {
                res.status(200).json(newThought)
            }
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },

    async deleteThought (req, res) {
        try {
            const deleteThought = await Thought.findByIdAndRemove({_id: req.params.thoughtId});

            if(!deleteThought) {
                res.status(400).json({ message: "No Thought with this ID!"})
            } else {
                await User.findByIdAndUpdate(
                    {thoughts: req.params.thoughtId},
                    {$pull: {thoughts: req.params.thoughtId}},
                    {new: true}
                );
                res.status(200).json({ message: "Thought was deleted"})
            }
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },

    async addReaction (req, res) {
        try {
            const addReaction = await Thought.findByIdAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {new: true}
            );

            if(!addReaction) {
                res.status(400).json({ message: "No Thought with this ID!"})
            } else {
                res.status(200).json(addReaction)
            }
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },

    async deleteReaction (req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {new: true}
            )

            if(!deleteReaction) {
                res.status(400).json({ message: "No Thought with this ID!"})
            } else {
                res.status(200).json(deleteReaction)
            }
        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    }
};