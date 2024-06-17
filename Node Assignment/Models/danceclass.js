const mongoose = require('mongoose');

const danceClassSchema = new mongoose.Schema({
    name: String,
    description: String,
    instructor: String,
    timing: String
});

module.exports = mongoose.model('DanceClass', danceClassSchema);
