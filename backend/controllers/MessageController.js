const Message = require('../models/Message');
const db = require('../models/db');

module.exports = {
    getMessages: async function (req, res) {
        var sql = "SELECT * FROM messages"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getMessage: async function (req, res) {
        var sql = "SELECT * FROM messages WHERE message_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getRecentMessage: async function (req, res) {
        var sql = "SELECT * FROM messages ORDER BY date_added DESC LIMIT 1"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createMessage: async function (req, res) {
        
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const message = new Message({
            message: req.body.message,
            date_added: new Date().toISOString().slice(0, 19).replace('T', ' '),
            times_used: req.body.times_used,
            date_for: req.body.date_for
        });

        db.query("INSERT INTO messages SET ?", message, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send(message);

            }
        });
    },
    updateMessage: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const message = new Message({
            message_id: req.body.message_id,
            message: req.body.message,
            times_used: req.body.times_used,
            date_for: req.body.date_for
        });


        db.query(
            "UPDATE messages SET message = ?, times_used = ?, date_for = ? WHERE message_id = ?",
            [message.message, message.times_used, message.date_for, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(message);    
                }
            }
        )
    },
    deleteMessage: async function (req, res) {
        db.query("DELETE FROM messages WHERE message_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({message: "Message deleted"});
            }
        });
    }
};