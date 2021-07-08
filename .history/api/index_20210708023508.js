const app = require('express')();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiUrl = 'https://www.metaweather.com/api'

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello!`);
});

app.get('/api/cities/:term', async (req, res) => {
    const { term } = req.params
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

app.post('/api/forecast', async (req, res) => {
    const { date, woeid } = req.body
    if (!date || !woeid) {
        return res.status(400).send("No term") 
    } else {
        try {
            const data = await axios.get(`${apiUrl}/location/${woeid}/${date.replaceAll('-', '/')}/}`);
            return res.status(200).json(data.data)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err.code })
        }
    }
});

module.exports = app;