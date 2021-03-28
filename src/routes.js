const express = require('express');
const productData = require('./productData');
const client = require('./app/controller/clients/clients');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect("/main");
})

routes.get('/main', (req, res) => {
    return res.render('main/main', { products: productData });
})

routes.get('/cart', (req, res) => {
    return res.render('cart/cart');
})

/* CLIENTs */

routes.get('/subscription', client.index);
routes.post('/subscription', client.create);

module.exports = routes;