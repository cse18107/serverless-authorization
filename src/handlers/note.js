const { connect } = require('../database/db');
const Note = require('../models/Note');





module.exports.createNote = async (event, context, callback) => {
    try{
        // cb(null, send(200,JSON.stringify({ msg: "Hello" }) ))
        await connect();
        const {userId} = event.requestContext.authorizer;
        const data = JSON.parse(event.body)
    
        const noteDb = await Note.create({...data, userId});
        console.log('noteDb==',noteDb);

        return {
            statusCode: 200,
            body: JSON.stringify(noteDb),
            headers: {'Content-Type': 'application/json'}
        };
    
    }catch(error) {
        return {
            statusCode: 502,
            message: error.message
        };
    }

};

module.exports.getNotes = async (event, context, callback) => {
    try{
        console.log(event.body)
        // cb(null, send(200,JSON.stringify({ msg: "Hello" }) ))
        await connect();

        const {userId} = event.requestContext.authorizer;
        
    
        const noteDb = await Note.find({userId});
        console.log('noteDb==',noteDb);

        return {
            statusCode: 200,
            body: JSON.stringify(noteDb),
            headers: {'Content-Type': 'application/json'}
        };
    
    }catch(error) {
        return {
            statusCode: 502,
            message: error.message
        };
    }

};