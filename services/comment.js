const Photo = require('../models/Photos');
const Comment = require('../models/Comments');

async function createComment(comment) {
    const result = new Comment(comment);

    await result.save();

    return result;
}

async function getComments(photoId) {
    return Comment.find({ photoId }).populate('ownerId', 'email');
}

async function editComment(id, comment) {
    const existing = await Comment.findById(id);

    console.log(existing)

    // existing. = comment.editText;

    await existing.save();

    return existing;
}

async function deleteComment(commentId) {
    await Comment.findByIdAndDelete(commentId);
}

module.exports = {
    createComment,
    getComments,
    editComment,
    deleteComment
}