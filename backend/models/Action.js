// const sql = require('../models/db');

const Action = function(action) {
    this.action_id = action.action_id,
    this.action_log = action.action_log,
    this.message_id = action.message_id,
    this.action_time = action.action_time
};

module.exports = Action;