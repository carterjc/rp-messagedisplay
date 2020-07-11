const express = require('express');
const router = express.Router();
const MessageController = require("../controllers/MessageController")

router.get("/", (req, res) => {
    MessageController.getMessages(req, res);
})

router.get("/recent", (req, res) => {
    MessageController.getRecentMessage(req, res);
})


router.get("/:id", (req, res) => {
    MessageController.getMessage(req, res);
})

router.post("/", (req, res) => {
    MessageController.createMessage(req, res);
})

router.post("/update/:id", (req, res) => {
    MessageController.updateMessage(req, res);
})

router.delete("/:id", (req, res) => {
    MessageController.deleteMessage(req, res);
})

module.exports = router;