const router = require('express').Router();
const { isAuth, isOwner } = require('../middleweares/guards');
const preload = require('../middleweares/preload');
const api = require('../services/photo');
const commentApi = require('../services/comment');
const mapErrors = require('../utils/mapper');
const { getUser } = require('../utils/storage');

router.get('/profile/:id', async (req, res) => {
    const user = {
        userId: req.params.id
    }
    const data = await api.getMyPhotos(user.userId);

    res.json(data);
});

router.get('/all', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.post('/create', async (req, res) => {
    const photo = {
        name: req.body.name,
        date: req.body.date,
        img: req.body.img,
        description: req.body.description,
        album: req.body.album,
        owner: req.body.ownerId,
        created_at: Date.now()
    }

    try {
        const result = await api.create(photo);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err).map(e => e.msg).join('\n');
        console.log(err.message);
        res.status(400).json({ message: error });
    }
});

router.get('/detail/:id', async (req, res) => {
    // const photo = res.locals.item;
    const photo = await api.getById(req.params.id)
    res.json(photo);
});

router.put('/edit/:id', preload(), async (req, res) => {
    const photId = req.params.id;

    const photo = {
        name: req.body.name,
        date: req.body.date,
        img: req.body.img,
        description: req.body.description,
        album: req.body.album,
        owner: req.body.ownerId,
    }

    try {
        const result = await api.update(photId, photo);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.delete('/delete/:id', preload(), async (req, res) => {
    try {
        const photoId = req.params.id;
        await api.deletePhoto(photoId);
        res.status(204).end();
    } catch (err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.post('/like/:id', async (req, res) => {
    const shoe = {
        owner: req.body.userId
    }

    console.log(shoe.owner)

    await api.addLike(shoe.owner, req.params.id);
});

router.post('/disLike/:id', async (req, res) => {
    const shoe = {
        owner: req.body.userId
    }

    await api.disLike(shoe.owner, req.params.id);
});

router.get('/search', async (req, res) => {
    const name = req.query.name
    const data = await api.search(name);
    res.json(data);
});

router.get('/comment/:id', async (req, res) => {
    const photoId = req.params.id;
    const data = await commentApi.getComments(photoId);
    res.json(data);
});

router.post('/comment', async (req, res) => {
    const commentData = {
        comment: req.body.comment,
        ownerId: req.body.ownerId,
        photoId: req.body.photoId
    };

    try {
        const result = await commentApi.createComment(commentData);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err).map(e => e.msg).join('\n');
        console.log(err.message);
        res.status(400).json({ message: error });
    }
});

router.put('/comment', async (req, res) => {
    const commentData = req.body.editText;

    try {
        const result = await commentApi.editComment(commentData);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err).map(e => e.msg).join('\n');
        console.log(err.message);
        res.status(400).json({ message: error });
    }
});

router.delete('/comment/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        await commentApi.deleteComment(commentId);
        res.status(204).end();
    } catch (err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

module.exports = router;