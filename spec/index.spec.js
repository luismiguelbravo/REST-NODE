var server = require('../app');
var supertest = require('supertest');

describe('routes tests ', function() {

    it('/ home deberia retornar 200 hello world', function(done) {
        var app = supertest(server);
        app.get('/')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    var nuevaCerveza = {
        "Id": 6,
        "Name": "Escudo",
        "Brewery": "Escudo Royal",
        "Country": "Country Escudo",
        "Price": 10.5,
        "Currency": "Escudo"
    };
    it('deberia crear una serveza', function (done) { // <= Pass in done callback
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(200, done);
    });

    it('deberia retornar 409 porque El ID de la cerveza ya existe', function (done) { // <= Pass in done callback
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(409, done);
    });

    
    it("deberia retornar 400 porque el tipo del 'Id' es invalido", function (done) { // <= Pass in done callback
        nuevaCerveza.Id = "66";
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(400, done);
    });

    it("deberia retornar 400 porque el tipo del 'Name' es invalido", function (done) { // <= Pass in done callback
        nuevaCerveza.Name = 45;
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(400, done);
    });

    it("deberia retornar 400 porque el tipo del 'Brewery' es invalido", function (done) { // <= Pass in done callback
        nuevaCerveza.Brewery = {hola: 56};
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(400, done);
    });

    it("deberia retornar 400 porque el tipo del 'Country' es invalido", function (done) { // <= Pass in done callback
        nuevaCerveza.Country = { country: 'Chile'};
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(400, done);
    });

    it("deberia retornar 400 porque el tipo del 'Price' es invalido", function (done) { // <= Pass in done callback
        nuevaCerveza.Price = { country: 'Chile'};
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(400, done);
    });

    it("deberia retornar 400 porque el tipo del 'Currency' es invalido", function (done) { // <= Pass in done callback
        nuevaCerveza.Currency = { country: 'Chile'};
        var app = supertest(server);
        app.post('/beers')
            .set('Accept', 'application/json')
            .send(nuevaCerveza)
            .expect(400, done);
    });

    it('/beers deberia retornar 200 y una lista de cervezas', function(done) {
        var app = supertest(server);
        app.get('/beers')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('/beers deberia retornar 200 una cerveza', function(done) {
        var app = supertest(server);
        app.get('/beers/1')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('/beers deberia retornar 404 cerveza no encontrada', function(done) {
        var app = supertest(server);
        app.get('/beers/111111111111111')
            .set('Accept', 'application/json')
            .expect(404, done);
    });

    it('/beers deberia retornar 200 y el precio de una caja de cervezas', function(done) {
        var app = supertest(server);
        app.get('/beers/1/boxprice')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('/beers deberia retornar 404 y el El Id de la cerveza no existe', function(done) {
        var app = supertest(server);
        app.get('/beers/1/boxprice')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('/beers deberia retornar 200 y la tasa de conversion del dolar a clp', function(done) {
        var app = supertest(server);
        app.get('/api/live?access_key=7d0ba48bf417e21212a140957e3221f3&currencies=USD,CLP')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

});

