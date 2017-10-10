var host = "127.0.0.1";
var port = 8080;
var express = require("express");
var main = require("./lib/main.js");
var exec = require('child_process').exec

var app = express();
app.use(express.static(__dirname + "/app")); //use static files in ROOT/public folder

app.get("/analyse", function(req, res){
  main.analyse()
    .then(labels => {
      res.header("Content-Type", "text/json");
      res.send(labels);
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(port, host);

exec('open http://localhost:' + port)
console.log("i18n Verify Server running in localhost:"+port+"!");
