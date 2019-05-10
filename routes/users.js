const errors = require('restify-errors');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const config = require('../config');

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
        const { email, password } = req.body;

        try {
            //Authenticate token
            const user = await auth.authenticate(email, password);

            //Create token
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '15m'
            });

            const {iat, exp} = jwt.decode(token);
            res.send({iat, exp, token});

            next();
        } catch (err) {
            return next(new errors.UnauthorizedError(err.message));
        }
    })
};