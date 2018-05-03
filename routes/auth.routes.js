const ctrl = require('../controllers/auth.controller')();

module.exports = (express) => {
    const router = express.Router();

    router.use(ctrl.auth);

    router.route('/profile/:id').get(ctrl.userPage);

    router.route('/role').post(ctrl.changeUserPermissions);

    router.route('/remove').post(ctrl.removeUser);


    return router;
};