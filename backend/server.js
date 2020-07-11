const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080 || process.env.PORT
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.json());

const api_pre = "/api/v1/";

app.get(api_pre, (req, res) => {
    res.json({ message: "Message sending API"});
});

const messageRouter = require('./routes/MessageRoute');
app.use(api_pre + 'messages', messageRouter);

const actionRouter = require('./routes/ActionRoute');
app.use(api_pre + 'actions', actionRouter);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})