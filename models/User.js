const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, minlength: [3, 'Username should be a minimum of 4 characters long'], maxlength: [7, 'Username should be a minimum of 4 characters long'] },
    hashedPassword: { type: String, required: true },
    myPhotos: {type: [ObjectId], ref: 'Photos'}
})

userSchema.index({email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
})

module.exports = model('User', userSchema);