<?php 
	$db_server = 'localhost';
	$db_username = 'root';
	$db_password = '';
	$db_name = 'game';

	$tt = '<ol>';
	$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
	if($conn->connect_error)
	{
		die("ERROR : ".$conn->connect_error);
	}
	else
	{
		if($result = mysqli_query($conn,"SELECT * FROM score ORDER BY score DESC LIMIT 10"))
		{
			while($row = mysqli_fetch_assoc($result))
			{
				$tt .= '<li>'.$row['name'].' Score: '.$row['score'].' Seconds: '.$row['seconds'].'</li>';
			}
			$tt .= '</ol>';
			echo $tt;
		}
	
	}

 ?>