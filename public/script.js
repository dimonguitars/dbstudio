$(document).ready(function() {

  $("#available").click(function() {
    console.log('scroll')
      $('html,body').animate({
          scrollTop: $("#about-me").offset().top},
          'slow');
  });
});

function submitForm(){
      var name = $('#recipient-name').val()
      var email = $('#email').val()
      var message = $('#message').val()
      if(name === ""){
      $('#exampleModalLabel').html('<div class="alert alert-danger" role="alert"><strong>Please enter your name</strong></div>')
      return false;
    } else if(email === ""){
      $('#exampleModalLabel').html('<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> Please enter your email and submit again.</div>')
      return false;
    } else if(message === ""){
      $('#exampleModalLabel').html('<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> Please enter your message and submit again.</div>')
    } else {
      $('#exampleModalLabel').html('<div class="alert alert-success" role="alert"><strong>Message sent!</strong> I reply to you soon</a>.</div>')
    }


  }
