'use strict';

var app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const rp = require('request-promise');
app.use(cors());
app.set('port', (process.env.PORT || 5000));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log("-------------------------------Request recieved!!!--------------------");
    next();
});

app.get('/hello', function (req, res) {
    let opts = {
        method: 'GET',
        url: 'https://cors-test-s1.herokuapp.com/hello',
        resolveWithFullResponse: true
    };
    rp(opts).then(response => {
        console.log(JSON.stringify(JSON.parse(response.body)));
        res.json(JSON.parse(response.body));
    }).catch(err => {
        console.log("Error happened" + JSON.stringify(err));
        res.status(500).json({ "reason": "Something went wrong" });
    })
});
app.use(function (req, res, next) {
    res.status(404).json({ "reason": "No resource exist" });
});
var server = app.listen(app.get('port'), function () {
    console.log(`${server.address().address} :${server.address().port}`);
});