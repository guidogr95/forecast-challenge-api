const app = require('express')();
const { v4 } = require('uuid');
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/cities/:term', async (req, res) => {
    const { term } = req.params
    const apiUrl = 'https://www.metaweather.com/api'
    if (!term) {
        return res.status(400).send("No term") 
    } else {
        try {
            const data = await axios.get(`${apiUrl}/location/search/?query=${encodeURI(term)}`)
            return res.status(200).json(data.data)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err.code })
        }
    }
});

module.exports = app;