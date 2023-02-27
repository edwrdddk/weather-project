const express = require('express');
const https = require('node:https');
const bodyParser = require('body-parser');

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

  const query = req.body.cityName;
  const apiKey = "31ef284dd780f1d6338330d0926a3b64"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units

  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (d) => {
      const weatherData = JSON.parse(d);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const wetherIconUrl  = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +  "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<html> <h3>The weather is currently " + weatherDescription + "</h3> </html>");
      res.write("<img src=" + wetherIconUrl + ">");
      res.send();
     });
  });
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
})
