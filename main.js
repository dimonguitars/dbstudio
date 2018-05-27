var express = require('express');
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
require('dotenv').config();


app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static(path.join(__dirname + '/bower_components')));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function(req, res){
    res.sendFile('/index.html');
});
app.get('/form', function(req, res){
  res.redirect('/')
})
app.post('/form', function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
    if(name === ""){
      console.log('name required')
      return;
    } else if(email === ""){
      console.log('email required')
      return;
    } else if (message === ""){
      return;
      console.log('message required')
    } else {
      let mailOpts, smtpTrans;
      smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });

      mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: process.env.GMAIL_USER,
        subject: 'New message from dblot.io',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
      };
      smtpTrans.sendMail(mailOpts)
      setTimeout(function(){ res.redirect('/') }, 1500)
    }


});




app.get('*', function(req, res) {
  res.status(404).send('<h1>uh oh! page not found!</h1>');
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Open http://localhost:3000 in the browser');
});
