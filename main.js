var express = require("express");
var app = express();
var path = require("path");
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var form = require('express-form');
var field = form.field;




app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('views', express.static(path.join( 'bower_components')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function(req, res, error) {
  res.render('index', { formMessage: 'Please describe you project'});
});

// app.get('/form', function (req, res) {
//   res.render('form', { title: 'Hey', message: 'Hello there!' })
// })


function sendEmail(){
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;

  let mailOpts, smtpTrans;

  mailOpts = {
    from: req.body.name + " &lt;" + req.body.email + "&gt;",
    to: process.env.GMAIL_USER,
    subject: "New message from dblot.io",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
  });
  smtpTrans.sendMail(mailOpts)
}



app.post("/form",
  form(
    field("name").trim().required().is(/^[a-z]+$/),
    field("email").trim().isEmail()
  ),
  function(req, res){
    if (!req.form.isValid) {
       console.log(req.form.errors);
        res.sendFile()
     } else {
       // Or, use filtered form data from the form object:
       console.log("Username:", req.form.name);
       console.log("Email:", req.form.email);
     }
  }
);

app.get("*", function(req, res) {
  res.status(404).send("<h1>uh oh! page not found!</h1>");
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Open http://localhost:3000 in the browser");
});
