error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

  $str = "Hello world!";
  echo $str;

  $to = "ldavid25@outlook.com";

  $headers = "From: $email_from \r\n";

  $headers = "Reply-To: $visitor_email \r\n";

  $email_body = "my text here";

  $t = mail($to,$email_subject,$email_body,$headers);

 ?>

console.log("called");
console.log($t);