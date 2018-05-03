const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const config = require('../config/config');
module.exports = ()=>{

    // function seedEvents(){
    //     MongoClient.connect(config.DB_URL, (err, client) => {
    //         if (err){
    //             console.error('error connecting to database\n' + err);
    //             return null;
    //         }
    //
    //         const collection = client.db(config.DB_NAME).collection(config.COLLECTION);
    //
    //         collection.insertMany([
    //             {
    //                 event:{
    //                     title: "Woodworking in action",
    //                     description: "Experience the joy of building things with your hands using wood and various woodworking tools.",
    //                     date: "7/11/2018",
    //                     contact: "joe@woodworker.com",
    //                     category: "Culture",
    //                     new: 1,
    //                     rating: 0
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Composting 101",
    //                     description: "Gardening is fun and a great way to learn about the world and environment. Learn to compost today and help reduce waste in the process!",
    //                     date: "5/02/2018",
    //                     contact: "jjcomposting@compostman.com",
    //                     category: "Culture",
    //                     new: 1,
    //                     rating: 0
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Board Game Night",
    //                     description: "Come play with various gamers from around the city. The nights special event is Settlers of Catan!",
    //                     date: "5/30/2018",
    //                     contact: "gamer@boardgaming.com",
    //                     category: "Gaming",
    //                     new: 0,
    //                     rating: 5
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Air Guitaring Basics",
    //                     description: "We're putting together a band, wanna join? This is a workshop to help people getting started in the extreme world of air guitar.",
    //                     date: "4/25/2018",
    //                     contact: "headbanger@sweetsolos.com",
    //                     category: "Lifestyle",
    //                     new: 0,
    //                     rating: 2
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Build The Web",
    //                     description: "We will be discussing new ways of building websites/web apps. From plain javascript, css and html to frameworks like Angular including plugins like JQuery and React.",
    //                     date: "5/18/2018",
    //                     contact: "webdev@webdevblog.com",
    //                     category: "Learning",
    //                     new: 0,
    //                     rating: 2
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Real Estate Talk",
    //                     description: "Discussion of what the market is like and talks from experience realtors about their experience and advice on being successful.",
    //                     date: "8/03/2018",
    //                     contact: "realtor@realtorgroup.com",
    //                     category: "Learning",
    //                     new: 0,
    //                     rating: 1
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Race Car Driver Meeting",
    //                     description: "We'll be talking about the races happening around the country, free food and drinks!",
    //                     date: "6/01/2018",
    //                     contact: "rickybobby@speedracer.com",
    //                     category: "Lifestyle",
    //                     new: 0,
    //                     rating: 2
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Learning The Easy Way",
    //                     description: "We're a group of teachers talking about tutoring and ways to help our students learn the new curriculum",
    //                     date: "8/10/2018",
    //                     contact: "teacher@notpaidenough.com",
    //                     category: "Learning",
    //                     new: 0,
    //                     rating: 3
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Fight Club",
    //                     description: "It's not a real fight club, just fans of the movie and we like to talk about it.",
    //                     date: "5/20/2018",
    //                     contact: "fighter@firstrule.com",
    //                     category: "Lifestyle",
    //                     new: 0,
    //                     rating: 5
    //                 }
    //             },
    //             {
    //                 event: {
    //                     title: "Hardcore Dancers Anonymous",
    //                     description: "We're providing a place for survivors of hardcore dancing to talk about the shows they went to and came out of the mosh pits tattered and broken.",
    //                     date: "7/15/2018",
    //                     contact: "highflyer@windmillarms.com",
    //                     category: "LifeStyle",
    //                     new: 0,
    //                     rating: 5
    //                 }
    //             }
    //         ], (err, result) => {
    //             if (err){
    //                 console.log('error seeding database\n' + err);
    //                 return;
    //             }
    //
    //             console.log(result);
    //         });
    //
    //         client.close();
    //     });
    // }

    function getAllEvents(done){
        MongoClient.connect(config.DB_URL, (err, client) => {
            if (err){
                console.error('error connecting to database\n' + err);
                done(err, false);
            } else {
                const collection = client.db(config.DB_NAME).collection(config.COLLECTION);

                collection.find({}).toArray((err, result) => {
                    if (err) {
                        console.error('could not get events\n' + err);
                        done(err, false);
                    } else {
                        done(null, result);
                    }
                });
            }

            client.close();
        });
    }

    function getEvents(done){
        MongoClient.connect(config.DB_URL, (err, client) => {
            if (err){
                console.error('error connecting to database\n' + err);
                done(err, false);
            } else {
                const collection = client.db(config.DB_NAME).collection(config.COLLECTION);
                collection.find({}).project({'event.contact': 0}).toArray((err, result) => {
                    if (err) {
                        console.error('could not get events\n' + err);
                        done(err, false);
                    }

                    done(null, result);
                });
            }

            client.close();
        });
    }

    function addEvent(event, done) {
        if (event) {
            MongoClient.connect(config.DB_URL, (err, client) => {
                if (err) {
                    console.error('error connecting to database\n' + err);
                    done(err, false);
                } else {
                    const collection = client.db(config.DB_NAME).collection(config.COLLECTION);

                    collection.insertOne({event: event}, (err, result) => {
                        if (err) {
                            console.error('could not insert event\n' + err);
                        } else {
                            console.log(result.ops);
                            done(null, result.ops);
                        }
                    });
                }

                client.close();
            });
        } else {
            done(null, false);
        }
    }

    function removeEvent(id, done) {
        const oid = new ObjectId(id);

        if (ObjectId.isValid(oid)) {
            MongoClient.connect(config.DB_URL, (err, client) => {
                if (err) {
                    console.error('error connecting to database\n' + err);
                    done(err, false);
                } else {
                    const collection = client.db(config.DB_NAME).collection(config.COLLECTION);

                    collection.findOneAndDelete({_id: oid}, (err, result) => {
                        if (err) {
                            console.error('error finding event\n' + err);
                            done(err, false);
                        } else {
                            if (result.value == null) {
                                done(null, false);
                            } else {
                                done(null, true);
                            }
                        }
                    });
                }

                client.close();
            });
        }
    }

    function getEventById(id, done) {
        const oid = new ObjectId(id);

        if (ObjectId.isValid(oid)) {
            MongoClient.connect(config.DB_URL, (err, client) => {
                if (err) {
                    console.error('error connecting to database\n' + err);
                    done(err, false);
                } else {
                    const collection = client.db(config.DB_NAME).collection(config.COLLECTION);

                    collection.findOne({_id: oid}, (err, result) => {
                        if (err) {
                            console.error('error finding event\n' + err);
                            done(err, false);
                        } else {
                            done(null, result);
                        }
                    });
                }

                client.close();
            });
        }
    }

    function updateEvent(event, done) {
        const oid = new ObjectId(event.id);

        if (ObjectId.isValid(oid)) {
            MongoClient.connect(config.DB_URL, (err, client) => {
                if (err) {
                    console.error('error connecting to database\n' + err);
                    done(err, false);
                } else {
                    const collection = client.db(config.DB_NAME).collection(config.COLLECTION);

                    collection.findOneAndUpdate({_id: oid}, {
                        $set: {
                            event: {
                                title: event.title,
                                description: event.description,
                                startTime: event.time,
                                date: event.date
                            }
                        }
                    }, (err, result) => {
                        if (err) {
                            console.error('error finding event\n' + err);
                            done(err, false);
                        } else {
                            done(null, result);
                        }
                    });
                }

                client.close();
            });
        }
    }

    return {
        getAllEvents: getAllEvents,
        getEvents: getEvents,
        removeEvent: removeEvent,
        updateEvent: updateEvent,
        getEventById: getEventById,
        addEvent: addEvent
        // seedEvents: seedEvents
    }
};