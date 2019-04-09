# form2mail

## 前端调用
``` js
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
```

## 后端设置
``` php
<?php
  header("Access-Control-Allow-Origin: *"); // ACAO按需设置
  header("Access-Control-Allow-Methods: POST");
  header('Content-type: application/json');
  require 'PHPMailerAutoload.php';
  $mail = new PHPMailer();

  $isPost =  empty($_POST['name']);
  if ($isPost) {
    $json =  json_encode(array(
      'code' => 500,
      'msg' => 'no data'
    ));
  }else{
    $user = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $cmt = $_POST['cmt'];

    $mail->isSMTP();// 使用SMTP服务
    $mail->CharSet = "utf8";// 编码格式为utf8，不设置编码的话，中文会出现乱码
    $mail->Host = "发送方的SMTP服务器地址";// 发送方的SMTP服务器地址
    $mail->SMTPAuth = true;// 是否使用身份验证
    $mail->Username = "发送方的邮箱用户名";// 发送方的邮箱用户名
    $mail->Password = "授权密码";// 发送方的邮箱密码，注意用163邮箱这里填写的是“客户端授权密码”而不是邮箱的登录密码！
    $mail->SMTPSecure = "ssl";// 使用ssl协议方式
    $mail->Port = 465;// 465/993

    $mail->setFrom("robot@linkroutes.com","LinkRoutes Robot");// 设置自动转发的所用的邮箱
    $mail->addAddress("support@linkroutes.com",'Support');  // 设置目标收件人
    // $mail->addAddress("user2@linkroutes.com",'user2');  // 设置目标收件人
    // $mail->addAddress("user3@linkroutes.com",'user3');  // 设置目标收件人

    $mail->addReplyTo($email ,$user);// 获取用户信息, 方便回复



    $mail->Subject = "The msg from www.linkroutes.com";// 邮件标题
    $mail->isHTML(true);
    $mail->Body = 'Name: '.$user.'<br/>'.'Email: '.$email.'<br/>'.'Phone: '.$phone.'<br/>'.'Msg: '.$cmt;// 邮件正文
    //$mail->AltBody = "This is the plain text纯文本";// 这个是设置纯文本方式显示的正文内容，如果不支持Html方式，就会用到这个，基本无用

    if(!$mail->send()){// 发送邮件
      $json = json_encode(array(
        'code' => 500,
        'msg' => $mail->ErrorInfo
      ));
    }else{
      $json = json_encode(array(
        'code' => 200,
        'msg' => 'ok'
      ));
    }
  }
  echo $json;
?>
```
***

## 表单
![表单](https://ws4.sinaimg.cn/large/006tNbRwly1fw5ki01do1j317g11478a.jpg)

## 邮件接收
![接受成功](https://ws3.sinaimg.cn/large/006tNbRwly1fw5kcjzoslj30ow0c6dfx.jpg)