const userRepo = require('../repositories/user.repo')();
module.exports = () => {
    // check to see if the user is logged in. basic route guarding on the server
    const auth = (req, res, next) => {
        if (!req.user) {
            res.redirect('/home');
        } else {
            next();
        }
    };

    const userPage = (req, res) => {
        res.render('profile.html');
    };

    const verify = (req, res) => {
        res.send(true).end();
    };

    const removeUser = (req, res) => {
        userRepo.removeUser(req.params.id, (result) => {
            console.log(result);
            res.end();
        });
    };

    const changeUserPermissions = (req, res) => {
        userRepo.updateRole(req.body, (err, user) => {
            res.end();
        });
    };

    return {
        userPage: userPage,
        removeUser: removeUser,
        changeUserPermissions: changeUserPermissions,
        verify: verify,
        auth: auth
    }
};