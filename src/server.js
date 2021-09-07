const express = require("express");
const nunjucks = require("nunjucks");
const routers = require("./routes/index");
const methodOverride = require("method-override");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(routers);

server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(4000, () => {
  console.log("Server is running normally!");
});
