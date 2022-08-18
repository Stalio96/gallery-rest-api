const userController = require('../controllers/user');
const catalogController = require('../controllers/catalog');

module.exports = (app) => {
    app.use('/user', userController);
    app.use('/data/catalog', catalogController);

    app.use('*', (req, res) => {
        res.render('404', { title: 'Page Not Found' })
    });
}