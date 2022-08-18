const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    comment: { type: String },
    ownerId: { type: ObjectId, ref: 'User' },
    photoId: { type: ObjectId, ref: 'Photo' },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = model('Comment', schema);