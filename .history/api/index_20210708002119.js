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