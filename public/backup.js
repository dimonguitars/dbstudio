if (name.length <= 0) {
  console.log('no name')
  res.end(error);

} else if (email === "") {
    res.end('name is required')

} else if (message === "") {
    res.end('name is required')
} else {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  mailOpts = {
    from: req.body.name + " &lt;" + req.body.email + "&gt;",
    to: process.env.GMAIL_USER,
    subject: "New message from dblot.io",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts);
  setTimeout(function() {
  }, 1500);
}
res.redirect('/')
