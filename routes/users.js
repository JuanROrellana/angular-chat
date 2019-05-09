const errors = require('restify-errors');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const auth = require('../auth')
module.exports = server => {
    //Register User
    server.post('/register', async (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        const user = new Users({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {

                //Hash password
                user.password = hash;
                //Save the user
                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message));
                }
            });
        })
    })

    server.post('/auth', async (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await auth.authenticate(email, password);
            res.send(user);
            next();
        } catch (err) {
            return next(new errors.UnauthorizedError(err.message));
        }
    })
};