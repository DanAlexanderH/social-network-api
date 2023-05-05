const { Schema, Types, model } = require('mongoose');
const moment = require('moment')


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Data,
            default: Data.now,
            get: createdAtData => moment(createdAtData).format('MM DD, YYYY [at] hh:mm a'),
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const Reaction = model('Reaction', reactionSchema);
module.exports = Reaction;
