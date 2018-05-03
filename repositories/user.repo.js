const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const config = require('../config/config');

module.exports = function () {
    const addUser = (user, done) => {
        MongoClient.connect(config.DB_URL, (err, client) => {
            if (err) {
                done(err, null);
            } else {
                const db = client.db(config.DB_NAME);

                findUser(db, user, (err, result, count) => {
                    if (err){
                        client.close();
                        return done(err, null);
                    } else {
                        if (count > 0) {
                            client.close();
                            return done(null, false, result);
                        }

                        if (!result){
                            insertUser(db, user, (err, result) => {
                                if (err) {
                                    return done(err, null);
                                }

                                if (result) {
                                    return done(null, result);
                                }

                                client.close();
                            });
                        }
                    }
                });
            }// end collection handler
        });
    };

    const removeUser = (user, done) => {
        MongoClient.connect(config.DB_URL, (err, client) => {
            if (err) {
                done(err, null);
            } else {
                const collection = client.db(config.DB_NAME).collection(config.USER_COLLECTION);

                // collection handler
                collection.find({},{user: {
                        username: user.username,
                        email: user.email
                    }}).toArray((err, result) => {
                    if (err) {
                        done(err, null);
                    }

                    if (result.length > 0) {
                        done(null, false);
                    } else {
                        done(null, result);
                    }
                });
            }
        });
    };

    const updateRole = (user) => {
        MongoClient.connect(config.DB_URL, (err, client) => {
            if (err) {
                done(err, null);
            } else {
                const collection = client.db(config.DB_NAME).collection(config.USER_COLLECTION);

                // collection handler
                collection.find({},{user:{
                        username: user.username,
                        email: user.email
                    }}).toArray((err, result) => {
                    if (err) {
                        done(err, null);
                    }

                    if (result.length > 0) {
                        done(null, false);
                    } else {
                        done(null, result);
                    }
                });
            }
            client.close();
        });
    };

    const findUser = (db, user, cb) => {
        const collection = db.collection(config.USER_COLLECTION);

        let userCount = 0;

        collection.find({},{user: {
                $in: [user.username,user.email]
                // username: {$match: user.username},
                // email: {$match: user.email}
            }}).toArray((err, result) => {
            if (err) {
                return cb(err, null);
            }

            if (result.length > 0) {
                userCount = result.length;
                for (let u in result) {
                    if (user.username == result[u].user.username) {
                        return cb(null, 'Username is taken', userCount);
                    } else if (user.email == result[u].user.email) {
                        return cb(null, 'Account linked to email exists', userCount);
                    } else {
                        userCount--;
                    }
                }

                // not an exact match
                return cb(null, false, userCount);
            } else {
                // console.log('no user found');
                return cb(null, false, userCount);
            }
        });
    };

    const insertUser = (db, user, cb) => {
        const collection = db.collection(config.USER_COLLECTION);

        bcrypt.hash(user.password, config.SALT, (err, hash) => {
            if (err){
                cb(err, null);
            } else {
                // create the user object to insert into the database
                const newUser = {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    password: hash,
                    pk: 'U'
                };

                collection.insertOne({user: newUser}, function (err, result) {
                    if (err) {
                        cb(err, null);
                    } else {
                        // console.log(result.ops);
                        cb(null, result.ops[0]);
                    }
                });
            }
        });
    };

    return {
        addUser: addUser,
        updateRole: updateRole,
        removeUser: removeUser
    }
};