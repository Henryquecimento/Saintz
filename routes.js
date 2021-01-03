const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect("/main");
})

routes.get('/main', (req, res) => {
    return res.render('main/main')
})

routes.get('/cart', (req, res) => {
    return res.render('cart/cart')
})

module.exports = routes;