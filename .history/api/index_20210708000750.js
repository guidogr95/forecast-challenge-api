// Utils
const app = require('express')();
// Handlers
// const fetchAirports = require('../helpers/fetchAirports');
const axios = require('axios')
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.post('/api/getAirports', async (req, res) => {
  const term = req.body.term
  let params = {}
  if (req.body.params) {
      params = {
          ...req.body.params
      }
  }
  const headers = {
    headers: {
      'Content-Type': 'aplication/json',
      'Accept': 'application/json',
      'APC-Auth': '3cf5d1fd31',
      'APC-Auth-Secret': '90df6df6e13e91c'
    }
  }
  const apiUrl = 'https://www.air-port-codes.com/api/v1'

  if (!term) {
      return res.status(400).send("No term") 
  } else {
      try {
          const data = await axios.post(`${apiUrl}/autocomplete?term=${term}`, {...params}, headers)
          return res.status(200).json([...data.data.airports])
      } catch (err) {
          return res.status(500).json({ error: err.code })
      }
  }
})

app.get('/api/getCities/:id', async (req, res) => {
  const term = req.params.id
  const apiUrl = 'https://www.metaweather.com/api'

  if (!term) {
      return res.status(400).send("No term") 
  } else {
      try {
          const data = await axios.get(`${apiUrl}/location/search/?query=${term}`)
          return res.status(200).json([...data])
      } catch (err) {
          return res.status(500).json({ error: err.code })
      }
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));

module.exports = app;