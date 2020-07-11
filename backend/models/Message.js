// const sql = require('../models/db');

const Message = function(message) {
    this.message_id = message.message_id,
    this.message = message.message,
    this.date_added = message.date_added,
    this.times_used = message.times_used,
    this.date_for = message.date_for
};

module.exports = Message;