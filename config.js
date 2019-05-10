module.exports = {
    ENV: process.env.ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL : process.env.URL || 'http://localhost:3000',
    MONGODB_URl: process.env.MONGODB_URl || 'mongodb://abc_123:abc_123@ds151626.mlab.com:51626/customer_api',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
};