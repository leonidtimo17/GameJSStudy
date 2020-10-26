<?php 
	$db_server = 'localhost';
	$db_username = 'root';
	$db_password = '';
	$db_name = 'game';

	$name = $_POST['name'];
	$score = $_POST['score'];
	$time = $_POST['time'];
	
	$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
	if($conn->connect_error)
	{
		die("ERROR : ".$conn->connect_error);
	}
	else
	{
		if($result = mysqli_query($conn, "INSERT INTO score (name,score,seconds) VALUES ('".$name."','".$score."','".$time."')"))
		{
			echo "yes";
		}
		
	}

 ?>