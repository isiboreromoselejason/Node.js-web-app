const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    timing: String
});

module.exports = mongoose.model('Event', eventSchema);
