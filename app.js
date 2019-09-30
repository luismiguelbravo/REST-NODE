var express = require('express');
var port = process.env.PORT || 3000;

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var request = require('request');
const axios = require('axios');


var arregloDeCervezas = [
    {
        Id: 1,
        Name: 'Golden',
        Brewery: 'Kross',
        Country: 'Chile',
        Price: 5.5,
        Currency: 'EUR'
    },
    {
        Id: 2,
        Name: 'Royal',
        Brewery: 'Brewery Royal',
        Country: 'Country Royal',
        Price: 10.5,
        Currency: 'USD'
    },
    {
        Id: 3,
        Name: 'Escudo',
        Brewery: 'Escudo Royal',
        Country: 'Country Escudo',
        Price: 20.5,
        Currency: 'CLP'
    }
];

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({ Hello: 'World'});
});

app.post('/beers', function (req, res) {
    var requestInvalida = false;
    // validar los tipos
    if (
        typeof req.body.Id !== "number"
        || typeof req.body.Name !== "string"
        || typeof req.body.Brewery !== "string"
        || typeof req.body.Country !== "string"
        || typeof req.body.Price !== "number"
        || typeof req.body.Currency !== "string"
    )
    {
        requestInvalida = true;
    }

    var idDuplicado = arregloDeCervezas.find(function(element) {
        return element.Id === req.body.Id;
    });

    res.setHeader('Content-Type', 'application/json');

    if (typeof idDuplicado !== "undefined") {
        res.status(409).send({ description: 'El ID de la cerveza ya existe'});
    } else {
        if (requestInvalida){
            res.status(400).send({ description: 'Request invalida'});
        } else {
            arregloDeCervezas.push(req.body);
            res.send({ description: 'Cerveza creada'});
        }
    }
});

app.get('/beers', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(arregloDeCervezas);
});

app.get('/beers/:id', function (req, res) {
    var beer = arregloDeCervezas.find(function(element) {
        return element.Id == req.params.id;
    });
    res.setHeader('Content-Type', 'application/json');
    if (typeof beer === "undefined")
    {
        res.status(404).send({ description: 'El Id de la cerveza no existe'});
    }
    else
    {
        res.send(
            {
                description: 'Operacion exitosa',
                beer: beer
            }
        );
    }
});

// se convierten todos los montos a CLP para pagar en Pesos Chilenos
app.get('/beers/:id/boxprice', function (req, res) {
    var beer = arregloDeCervezas.find(function(element) {
        return element.Id == req.params.id;
    });
    res.setHeader('Content-Type', 'application/json');
    if (typeof beer === "undefined")
    {
        res.status(404).send({ description: 'El Id de la cerveza no existe'});
    }
    else
    {
        /*
        // http://localhost:3000/
        // http://apilayer.net
        */
        axios.get('http://apilayer.net/api/live?access_key=7d0ba48bf417e21212a140957e3221f3&currencies='+ beer.Currency +',CLP')
            .then(response => {
                var precioDeCaja = beer.Price / response.data.quotes['USD' + beer.Currency] * response.data.quotes['USDCLP'];
                res.send({
                    Quantity : 6,
                    PriceTotal : 6 * precioDeCaja,
                    Currency: 'CLP'
                });
            })
            .catch(error => {
                res.status(500).send({ description: 'Falla en el servicio de conversion de monedas'});
            });
    }
});


// Funcion para hacer mock de /api/live y evitar consumirme los 250 request mensuales del plan free
app.get('/api/live', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var jsonResult = {
        success: true,
        terms: "https://currencylayer.com/terms",
        privacy: "https://currencylayer.com/privacy",
        timestamp: 1569773347,
        source: "USD",
        quotes: {
            USDUSD: 1,
            USDEUR: 0.91399,
            USDCLP: 726.285041
        }
    }
    res.send(jsonResult);
});

app.listen(port, function () {
    console.log('Example app listening on port !');
});

module.exports = app;