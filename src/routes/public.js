const express = require("express");

const PublicController = require("../app/controller/PublicController");

const routes = express.Router();

/* Public Access */
routes.get("/", PublicController.index);

module.exports = routes;