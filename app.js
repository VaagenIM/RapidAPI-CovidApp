const express = require('express')
const axios = require("axios").default;
const pug = require('pug')
const app = express()
const port = 3000

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    params: {country: 'Norway'},
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': 'HentDinEgen https://rapidapi.com/api-sports/api/covid-193/'
    }
  };

  axios.request(options).then(function (response) {
    // Se https://rapidapi.com/api-sports/api/covid-193/ for hva du kan hente,
    // ['response'][0]['... mye rart her!']
    var data = response.data['response'][0]['cases']
    var newCases = data['new']
    var activeCases = data['active']
    res.render('index', { newCases: newCases, activeCases: activeCases})

  }).catch(function (error) {
  	console.error(error);
  });
})


app.listen(port, () => {
  console.log(`Se nettsiden i nettleser; http://localhost:${port}`)
})
