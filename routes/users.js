const errors = require('restify-errors');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

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
};