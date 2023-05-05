const router = require('express').Router();

const {
    allThoughts,
    singleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controller/thoughController');

router.route('/').get(allThoughts).post(createThought);

router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;