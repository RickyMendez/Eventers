module.exports = (express) => {
    const router = express.Router();
    const ctrl = require('../controllers/events.controller')();

    // router.use(ctrl.auth);

    router.route('/').get(ctrl.auth, ctrl.getEventsPage);
    // router.route('/').get(ctrl.getEventsPage);

    router.route('/event/:id')
        // .get(ctrl.getEventPage)
        // .post(ctrl.getEventById);
        .get(ctrl.auth, ctrl.getEventPage)
        .post(ctrl.auth, ctrl.getEventById);

    router.route('/add').post(ctrl.auth, ctrl.addEvent);
    // router.route('/add').post(ctrl.addEvent);

    router.route('/update').post(ctrl.auth, ctrl.updateEvent);
    // router.route('/update').post(ctrl.updateEvent);

    router.route('/remove/:id').post(ctrl.auth, ctrl.removeEvent);
    // router.route('/remove/:id').post(ctrl.removeEvent);

    router.route('/get/all/full').get(ctrl.auth, ctrl.getAllEvents);
    // router.route('/get/all/full').get(ctrl.getAllEvents);

    router.route('/get/all').get(ctrl.getEvents);

    // router.route('/seed').get(ctrl.seedDb);

    return router;
};