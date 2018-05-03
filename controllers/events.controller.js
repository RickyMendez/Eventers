const eventsRepo = require('../repositories/events.repo')();
module.exports = () => {
    // check to see if the user is logged in. basic route guarding on the server
    const auth = (req, res, next) => {
        if (!req.user) {
            res.redirect('/home');
        } else {
            next();
        }
    };

    const addEvent = (req, res) => {
        eventsRepo.addEvent(req.body, (err, event) => {
            if (err) {
                res.json({error: 'could not add event'});
            }

            if (!event) {
                res.json({message: 'no event'});
            } else {
                res.json(event);
            }
        });
    };

    const updateEvent = (req, res) => {
        eventsRepo.updateEvent(req.body, (err, event) => {
            if (err) {
                res.json({error: 'could not remove event'});
            }

            res.end();
        });
    };

    const removeEvent = (req, res) => {
        eventsRepo.removeEvent(req.params.id, (err, result) => {
            if (err) {
                res.json({error: 'could not remove event'});
            }

            if (result){
                res.json({message: 'removed event successfully'})
            } else {
                res.json({message: 'event not found'});
            }
        });
    };

    const getEventsPage = (req, res) => {
        res.render('events.html');
    };

    const getAllEvents = (req, res) => {
        eventsRepo.getAllEvents(function (err, events) {
            if (err){
                console.error("database error\n" + err);
                res.json({
                    error: "could not get events"
                });
            }

            if (events) {
                res.json(events);
            } else {
                res.json({
                    message: 'no events'
                });
            }
        });
    };

    const getEvents = (req, res) => {
        eventsRepo.getEvents(function (err, events) {
            if (err){
                console.error("database error\n" + err);
                res.json({
                    error: "could not get events"
                });
            }

            if (events) {
                res.json(events);
            } else {
                res.json({
                    message: 'no events'
                });
            }
        });
    };

    const getEventById = (req, res) => {
        eventsRepo.getEventById(req.params.id, function (err, event) {
            if (err){
                console.error("database error\n" + err);
                res.json({
                    error: "could not get event"
                });
            }

            if (event) {
                res.json(event);
            } else {
                res.json({
                    message: 'Could not find event'
                });
            }
        });
    };

    const getEventPage = (req, res) => {
        res.render('event.html');
    };

    // const seedDb = (req, res) => {
    //     eventsRepo.seedEvents();
    //     res.render('events.html');
    // };

    return {
        getEventsPage: getEventsPage,
        getAllEvents: getAllEvents,
        getEvents: getEvents,
        getEventPage: getEventPage,
        getEventById: getEventById,
        addEvent: addEvent,
        updateEvent: updateEvent,
        removeEvent: removeEvent,
        auth: auth
        // seedDb: seedDb
    }
};