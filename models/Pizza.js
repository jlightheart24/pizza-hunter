const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema(
    {
        pizzaName: {
        type: String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [],
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;