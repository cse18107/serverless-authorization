const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Notes", NoteSchema);