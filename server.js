var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


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
        //console.log(buf.toString());
        res.send(buf.toString());
    });
});

app.post("/updateExpense",function(req,res){
    //console.log(req.body);
    console.log(JSON.stringify(req.body));
    fs.writeFile("expense.json",JSON.stringify(req.body),function(err, result) {
        if(err) {
            console.log('error', err);
            res.send("error");
        }
        res.send("Success");
      });
});

app.listen(process.env.PORT || 8080);