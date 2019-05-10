const errors = require('restify-errors');
const Customer = require('../models/Customers');
const rjwt = require('restify-jwt-community');
const config = require('../config');

module.exports = server => {
    server.get('/customers',  async (req, res, next) => {
        //Get Customers
        try {
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get SIngle Customer
    server.get('/customers/:id', async (req, res, next) => {
        //Get Customers
        try {
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no customer with the id of ${req.params.id}`
                )
            );
        }
    });

    //Add Customer
    server.post('/customers', rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        //Check for json
        if (!req.is('application/json')) {
            return next(new errors.BadRequestError('Expect application/json'));
        }

        const {
            name,
            email,
            balance
        } = req.body;

        const customer = new Customer({
            name,
            email,
            balance
        });

        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }

    });

    //Update Customer
    server.post('/customers/:id', async (req, res, next) => {
        //Check for json
        if (!req.is('application/json')) {
            return next(new errors.BadRequestError('Expect application/json'));
        }

        try {
            const customer = await Customer.findOneAndUpdate({
                _id: req.params.id
            }, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no customer with the id of ${req.params.id}`
                )
            );
        }
    });

    //Delete Customer
    server.del('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findByIdAndRemove({
                _id: req.params.id
            });
            res.send(204);
            next()
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no customer with the id of ${req.params.id}`
                )
            );
        }
    });
};