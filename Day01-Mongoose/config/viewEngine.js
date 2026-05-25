const express = require("express");
const path = require("path");
let viewEngine = (app) => {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, '..', 'views')); 
}
module.exports = viewEngine;
