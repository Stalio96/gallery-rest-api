const { getById } = require("../services/photo");

module.exports = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await getById(id);
        item._ownerId = item.owner;
        console.log(item._ownerId)
        res.locals.item = item;
        next();
    } catch (err) {
        res.status(404).json({message: 'Record not found'});
    }
}