const axios = require('axios')

module.exports = async (req, res) => {

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
}
