const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },    
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

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

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought
module.exports = reactionSchema;