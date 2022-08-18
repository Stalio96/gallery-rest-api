const Photo = require('../models/Photos');
const User = require('../models/User');

async function getAll() {
    return Photo.find({});
}

async function search(query) {
    const title = query || '';
    return Photo.find({ name: new RegExp(`^${title}$`, 'i') });
}

async function getMyPhotos(id){
    console.log(id)
    const photos = await User.findById(id);
    const myCart = [];

    for(let id of photos.myPhotos){
        console.log(id)
        const photo = await Photo.findById(id);
        
        myCart.push(photo);
    }

    console.log(myCart)

    return myCart;
}

async function create(photo) {
    const result = new Photo(photo);

    await result.save();

    return result;
}

async function getById(id) {
    return Photo.findById(id).populate('owner', 'email');
}

async function update(id, photo) {
    const existing = await Photo.findById(id);

    existing.name = photo.name;
    existing.date = photo.date;
    existing.img = photo.img;
    existing.img = photo.img;
    existing.description = photo.description;

    await existing.save();

    return existing;
}

async function deletePhoto(id){
    await Photo.findByIdAndDelete(id);
}

async function addLike(userId, photoId){
    const user = await User.findById(userId);
    user.myPhotos.push(photoId);
    await user.save();
}

async function disLike(userId, photoId){
    const user = await User.findById(userId);
    const index = user.myPhotos.indexOf(photoId);
    user.myPhotos.splice(index, 1);
    await user.save();
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deletePhoto,
    addLike,
    search,
    getMyPhotos,
    disLike
}