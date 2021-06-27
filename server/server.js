// Load HTTP module
const fetch = require("node-fetch")
const express = require('express');
const app = express();
var cors = require('cors')
const port = 8000;

app.use(cors({
    origin: "*"
}))
app.get('/search', async (req, res) => {
    const searchString = req.query.q
    const response = await fetch(`https://superheroapi.com/api/10226504347219088/search/${searchString}`)
    const data = await response.json()
    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`server listening on port ${port}!`)
});
