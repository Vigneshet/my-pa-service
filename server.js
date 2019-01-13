var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
    next();
});

app.get('/getExpenses',function(req,res){
    fs.readFile('expense.json', function(err, buf) {
        console.log(buf.toString());
        res.send(buf.toString());
    });
});

app.listen(process.env.PORT || 8080);