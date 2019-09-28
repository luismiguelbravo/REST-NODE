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

var listBeerBox = [
    {
        boxBeerPriceById: 1,
        beerId: 1,
        priceTotal : 57,
        beer: arregloDeCervezas[0]
    },
    {
        boxBeerPriceById: 2,
        beerId: 2,
        priceTotal : 58,
        beer: arregloDeCervezas[1]
    },
    {
        boxBeerPriceById: 3,
        beerId: 3,
        priceTotal : 59,
        beer: arregloDeCervezas[2]
    },
];


app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
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

app.get('/beers/:id/boxprice', function (req, res) {

    var indice = 0;
    var beerBox = null;
    while(indice < listBeerBox.length) {
        if (listBeerBox[indice].beer.Id == req.params.id)
        {
            beerBox = listBeerBox[indice];
        }
        indice++;
    }

    res.setHeader('Content-Type', 'application/json');
    if (beerBox === null)
    {
        res.status(404).send({ description: 'El Id de la cerveza no existe'});
    }
    else
    {
        res.send(beerBox);
    }
});


app.listen(port, function () {
    console.log('Example app listening on port !');
});