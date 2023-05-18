const { connect } = require('../database/db');
const User = require('../models/User');

module.exports.handler = async (event, context, callback) => {
    try{
    await connect();

    const userDb = await User.create(JSON.parse(event.body));

    
        return{
            statusCode: 200,
            body: JSON.stringify(userDb),
            headers: {'Content-Type': 'application/json'}
        };
    
    }catch(error) {
        return {
            statusCode: 502,
            message: error.message
        };
    }

};