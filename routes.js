const express = require('express');
const productData = require('./productData');
const client = require('./subscription')

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
    return res.render('subscription/subscribe');
})

routes.post('/subscription')/* add the function */

module.exports = routes;