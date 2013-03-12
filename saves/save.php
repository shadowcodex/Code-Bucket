<?php 

	// Setup variables
	$filename = $_POST['filename'];
	$extension = $_POST['extension'];
	$content = $_POST['contents'];
	$date = date('Y-m-d H:i:s'); // get time stamp
	if($_POST['author'] != "") {$author = $_POST['author'];} else {$author = ""};
	if($_POST['title'] != "") {$title = $_POST['title'];} else {$title = ""};
	if($_POST['key'] != "") {$password = $_POST['key'];} else {$key = ""};

	// Setup database connection
	$dbname='base';
	$mytable ="file_store";
	$base=new SQLite3($dbname, 0666);

	// Do the query
	$query = "SELECT * FROM $mytable WHERE ID = $filename";
	$row = $results->fetchArray();
	$results = $base->exec($query);
	if(count($row) > 0) {
		$query = "	UPDATE $mytable 
					SET code_title=$title, code_extension=$extension, code_author=$author, code_date=$date, code_password=$key 
					WHERE ID=$filename
				 ";
		$results = $base->exec($query);
	} else {
		$query = "INSERT INTO $mytable(ID, code_title, code_extension, code_author, code_date, code_password)
                VALUES ('$filename', '$title', '$extension', '$author', '$date', '$key')";
		$results = $base->exec($query);
	}

	// Save the actual file
	file_put_contents($filename . ".code" , $content); 
?>