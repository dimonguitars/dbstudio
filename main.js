var express = require('express');
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')


app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static(path.join(__dirname + '/bower_components')));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function(req, res){
    res.sendFile('/index.html');
});


app.post('/form', function(req, res){

  let transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: 'varreact@gmail.com',
    pass: 'B7183325050'
  }
  })
  var mailOptions = {
    sender: "here is from section",
    to: 'varreact@gmail.com',
    subject: req.body.email,
    text: req.body.message
  };

  if (req.body.email ==='') {
    return;
  } else if (req.body.message ==='') {
     return;
  } else {
    transporter.sendMail(mailOptions)
    setTimeout(function(){ res.redirect('/') }, 1500);
  }
})



app.get('*', function(req, res) {
  res.status(404).send('<h1>uh oh! page not found!</h1>');
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Open http://localhost:3000 in the browser');
});
