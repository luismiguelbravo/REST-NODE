var express = require('express');
var port = process.env.PORT || 3000;

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var arregloDeCervezas = [
        {
            Id: 1,
            Name: 'Golden',
            Brewery: 'Kross',
            Country: 'Chile',
            Price: 10.5,
            Currency: 'EUR'
        },
        {
            Id: 2,
            Name: 'Royal',
            Brewery: 'Brewery Royal',
            Country: 'Country Royal',
            Price: 10.5,
            Currency: 'ROY'
        },
        {
            Id: 3,
            Name: 'Escudo',
            Brewery: 'Escudo Royal',
            Country: 'Country Escudo',
            Price: 10.5,
            Currency: 'ESC'
        }
    ];

app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
});

app.post('/beers', function (req, res) {
    // validar los tipos
    console.log("");
    console.log(" ------- req.body ------- ");
    console.log(req.body);
    console.log(" ------- req.body ------- ");
    console.log("");
    res.send(JSON.stringify({ Hello: 'Post Recivido'}));
});

app.post('/beers', function (req, res) {
    res.send(JSON.stringify(arregloDeCervezas));
});


app.listen(port, function () {
    console.log('Example app listening on port !');
});