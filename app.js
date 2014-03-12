var express = require('express');
var browserify = require('browserify-middleware');
var stylus = require('stylus');
var fs = require('fs');

var app = express();

app.get('/bundle.js', browserify('./src/app.js', {
  transform: ['jadeify']
}));

app.get('/style.css', function(req, res) {
  fs.readFile('./style/style.styl', 'utf-8', function(err, str) {
    if(err) {
      return req.next(err);
    }
    stylus.render(str, {
      filename: './style/style.styl'
    }, function(err, css) {
      if(err) {
        return req.next(err);
      }
      res.type('css');
      res.send(css);
    });
  });
});

app.get('/*', function(req, res) {
  res.render('index.jade');
});

app.listen(process.env.PORT || 3000);
