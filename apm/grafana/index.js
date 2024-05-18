const express = require("express");
const app = express();
const expressStatsd = require("express-statsd");

app.use(expressStatsd());

function statsd(path) {
    return function (req, res, next) {
        var method = req.method || "unknown_method";
        req.statsdKey = ["http", method.toLowerCase(), path].join(".");
        // http.root.get
        // http.products.get
        next();
    };
}

app.get("/", statsd("root"), (req, res) => {
    if (between(0, 10) > 5) {
        res.status(500).send();
    }
    res.send("Response from a simple GET API");
});

app.get("/products", statsd("products"), (req, res) => {
    if (between(0, 10) > 5) {
        res.status(500).send();
    }
    res.send("Response from a simple GET API");
});

app.listen(8000, () => {
    console.log("Node server started on port 8000");
});

function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}