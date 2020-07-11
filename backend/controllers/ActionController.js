const Message = require('../models/Message');
const db = require('../models/db');

module.exports = {
    getActions: async function (req, res) {
        var sql = "SELECT * FROM actions"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getAction: async function (req, res) {
        var sql = "SELECT * FROM actions WHERE action_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createAction: async function (req, res) {
        
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const action = new Action({
            action_log: req.body.action_log,
            message_id: req.body.message_id,
            action_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });

        db.query("INSERT INTO actions SET ?", action, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send(action);

            }
        });
    },
    updateAction: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const action = new Action({
            action_log: req.body.action_log,
            message_id: req.body.message_id,
            action_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });


        db.query(
            "UPDATE actions SET action_log = ?, message_id = ?, action_time = ? WHERE action_id = ?",
            [action.action_log, action.message_id, action.action_time, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(action);    
                }
            }
        )
    },
    deleteAction: async function (req, res) {
        db.query("DELETE FROM actions WHERE action_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({message: "Action deleted"});
            }
        });
    }
};