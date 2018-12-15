module.exports = (express) => {
    const router = express.Router();

    const ctrl = require('../controllers/index.controller')();

    router.route('/').get(ctrl.getIndexPage);

    router.route('/verify').get(ctrl.verify);

    router.route('/home').get(ctrl.getHomePage);

    router.route('/login').post(ctrl.login);

    router.route('/logout').post(ctrl.logout);

    router.route('/register').post(ctrl.register);

    return router;
};