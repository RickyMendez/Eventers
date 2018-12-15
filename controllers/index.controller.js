const passport = require('passport');
const userRepo = require('../repositories/user.repo')();

module.exports = () => {

    // login route
    const login = (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            const data = {
                error: null,
                user: null,
                message: null
            };

            if (err){
                console.log(err);
                data.error = 'Unable to login, try again later'
            } else {
                if (!user) {
                    data.message = info;
                } else {
                    data.user = user;
                }
            }

            req.login(user, err => {
                if (err){
                    return res.send({message: 'error logging in'});
                } else {
                    return res.json(data);
                }
            });
        })(req, res);
    };

    const register = (req, res) => {
        userRepo.addUser(req.body, (err, user, msg) => {
            if (err) {
                console.log(err);
                res.json({message: 'could not register user, try again later'});
            }

            if (!user){
                res.json({message: msg});
            } else {
                req.login(user, (err, result) => {
                    if (err){
                        console.error(err);
                        res.json({message: 'could not login after registration'});
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    };

    // logout handler
    const logout = (req, res) => {
        req.logout();
        res.redirect('/home');
    };

    // Verify user is logged in
    const verify = (req, res) => {
       if (!req.user)
           res.send(false);
       else
           res.send(true);
    };

    // home page route
    const getHomePage = (req, res) => {
      res.render('home.html');
    };

    // landing page route
    const getIndexPage = (req, res) => {
        res.render('index.html');
    };

    // returns from the module as a javascript object
    return {
        login: login,
        logout: logout,
        register: register,
        getHomePage: getHomePage,
        getIndexPage: getIndexPage,
        verify: verify
    }
};