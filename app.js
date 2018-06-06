let express = require('express');
let app = express();
let data = require('./public/js/module/data');

app.use(express.static('public'));

app.get('/project', (req, res) => {
    res.sendFile('project.html', { root: __dirname + '/public/'});
});

app.get('/partners', (req, res) => {
    res.sendFile('partners.html', { root: __dirname + '/public/'});
});

app.get('/useragreement', (req, res) => {
    res.sendFile('useragreement.html', { root: __dirname + '/public/'});
});

app.get('*', (req,res) => {
    res.redirect('/');
});

app.listen(8081, function () {
  console.log('App listening on port 8081!');
});