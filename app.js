var express = require('express');
var app = express();
var data = require('./public/js/module/data');

app.use(express.static('public'));

app.get('/project', (req, res) => {
    res.sendFile('project.html', { root: __dirname + '/public/'});
});

app.listen(8081, function () {
  console.log('App listening on port 8081!');
});