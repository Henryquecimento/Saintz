const express = require('express');
const productData = require('./productData');
const clientData = require('./clientData')

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect("/main");
})

routes.get('/main', (req, res) => {
    return res.render('main/main', {products: productData});
})

routes.get('/cart', (req, res) => {
    return res.render('cart/cart');
})

routes.get('/subscription', (req, res) => {
    return res.render('subscription/subscribe', {client: clientData});
})

module.exports = routes;