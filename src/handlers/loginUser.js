const { connect } = require('../database/db');
const User = require('../models/User');
var jwt = require('jsonwebtoken');

const secret = 'sdfwefsdnlksefiweufinbciwse';

module.exports.handler = async (event, context, callback) => {
    try {
        await connect();
        console.log(JSON.parse(event.body))
        const { email, password } = JSON.parse(event.body);

        const userDb = await User.findOne({ email, password });
        if (!userDb) {
            callback(null, {
                statusCode: 502,
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: { userId: userDb._id }
        }, secret)


        return {
            statusCode: 200,
            body: JSON.stringify(token),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (error) {
        return {
            statusCode: 502,
            message: error.message
        };
    }

};