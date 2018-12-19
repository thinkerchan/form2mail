$(function(){
  $('#contactForm').on('submit',function(e){
    e.preventDefault();
    $('#Jloading').show();
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var comments = $('#message').val();

    $('button.btn-xl').addClass('disabled').attr('disabled','disabled');
    $.ajax({
      url:'mail.php', // mail.php得配置好参数
      method:'POST',
      data:{
        name:name,
        email:email,
        phone:phone,
        cmt:comments
      },
      dataType:"json",
      success:function(data) {
        $('#Jloading').hide();
        if (data.code == 200) {
          $('#success').show();
        }else{
          $('#error').show();
        }
      }
    });
    return false;
  });

  $.validate({
    modules : 'html5, toggleDisabled'
  });
})
