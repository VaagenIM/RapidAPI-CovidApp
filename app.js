// Endre meg! https://rapidapi.com/api-sports/api/covid-193/
const apikey = "EndreMeg!"

const express = require('express')
const pug = require('pug')
const app = express()
const port = 3000


const axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://covid-193.p.rapidapi.com/statistics',
  params: {country: "Norway"},
  headers: {
    'x-rapidapi-host': 'covid-193.p.rapidapi.com/statistics',
    'x-rapidapi-key': apikey
  }
};


app.set('view engine', 'pug')

app.get('/', (req, res) => {
  var country = req.query.country;
  country ??= "Norway"; // Default value
  options.params.country = country;

  axios.request(options).then(function (response) {
    var data = response.data['response'][0]['cases']

    var newCases = data['new']
    newCases ??= "0!! :)";
    var activeCases = data['total']

    res.render('index', {country: country, newCases: newCases, activeCases: activeCases})

  }).catch(function (error) {
    // .catch() kjører ved feilmelding
    res.send(error)
  });
})


app.listen(port, () => {
  console.log(`Se nettsiden i nettleser; localhost:${port}`)
})
