const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String },
    album: { type: String },
    comment: { type: [ObjectId], ref: 'Comment' },
    owner: { type: ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = model('Photo', schema);