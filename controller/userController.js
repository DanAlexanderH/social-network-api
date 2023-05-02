const { User } = require('../model');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId });

            if(!singleUser) {
                return res.status(400).json({ message: 'No User with that ID!' });
            } else {
                res.status(200).json(singleUser);
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json(newUser)
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!updateUser) {
                return res.status(400).json({ message: 'There is no User with this ID!'})
            } else {
                res.status(200).json(updateUser);
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });

            if(!deleteUser) {
                return res.status(400).json({ message: 'There is no User with this ID!'})
            } else {
                res.status(200).json({ message: 'User has been deleted'})
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async addFriend(req, res) {
        try {
            const addFriend = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendsId} },
                { runValidators: true, new: true }
            );

            if(!addFriend) {
                return res.status(400).json({ message: 'There is no User with this ID!'})
            } else {
                res.status(200).json(addFriend)
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const deleteFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendsId} },
                { runValidators: true, new: true }
            );

            if(!deleteFriend) {
                return res.status(400).json({ message: 'There is no User with this ID!'})
            } else {
                res.status(200).json(deleteFriend)
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
};