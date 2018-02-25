var express = require('express');
var app = express();
var data = require('./public/js/module/data');

app.use(express.static('public', {index: 'index.html'}));

app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
  //$("footer").text(data.myDateTime());
})