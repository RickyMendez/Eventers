const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const {Strategy} = require('passport-local');

module.exports = () => {
    passport.use(new Strategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, cb) => {
            MongoClient.connect(config.DB_URL, (err, client) => {
                if (err) {
                    return cb(err, null);
                } else {
                    const collection = client.db(config.DB_NAME).collection(config.USER_COLLECTION);

                    // collection handler
                    collection.find({},{user:{username: username}}).toArray((err, result) => {
                        if (err) {
                            return cb(err, null);
                        }

                        if (result.length < 1){
                            return cb(null, false, 'Invalid username/password');
                        } else {
                            bcrypt.compare(password, result[0].user.password, (err, res) => {
                                if (err) {
                                    return cb(err, null);
                                } else {
                                    if (res) {
                                        return cb(null, {
                                            username: result[0].user.username,
                                            email: result[0].user.email,
                                            phone: result[0].user.phone,
                                            pk: result[0].user.pk
                                        });
                                    } else {
                                        return cb(null, false, 'Invalid username/password');
                                    }
                                }
                            });// end bcrypt compare
                        }
                    });
                }
                client.close();
            });
    }));
};