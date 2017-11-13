var host = "127.0.0.1";
var port = 8080;
var express = require("express");
var main = require("./lib/main.js");
var exec = require('child_process').exec
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/app")); //use static files in ROOT/public folder

app.post("/analyse", function(req, res){
  main.analyse(req.body.langPath, req.body.baseDirPath)
    .then(labels => {
      res.header("Content-Type", "text/json");
      res.send(labels);
    })
    .catch(err => {
      console.error(err.stack)
      res.header("Content-Type", "text/plain");
      res.status(500).send(err.stack)
    });
});

app.listen(port, host);

console.log("i18n Verify Server running in localhost:"+port+"!");

var command = 'open';
(process.platform === 'linux') && (command='xdg-open');

exec(command + ' http://localhost:' + port);
