const express = require('express');
const router = express.Router();
const ActionController = require("../controllers/ActionController")

router.get("/", (req, res) => {
    ActionController.getActions(req, res);
})

router.get("/:id", (req, res) => {
    ActionController.getAction(req, res);
})

router.post("/", (req, res) => {
    ActionController.createAction(req, res);
})

router.post("/update/:id", (req, res) => {
    ActionController.updateAction(req, res);
})

router.delete("/:id", (req, res) => {
    ActionController.deleteAction(req, res);
})

module.exports = router;