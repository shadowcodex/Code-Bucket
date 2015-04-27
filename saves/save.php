<?php 

	// Setup variables
	$filename = $_POST['filename'];
	$extension = $_POST['extension'];
	$content = $_POST['contents'];
	$background = $_POST['background'];
	$date = date('Y-m-d H:i:s'); // get time stamp
	if(isset($_POST['author'])) {$author = $_POST['author'];} else {$author = "";}
	if(isset($_POST['title'])) {$title = $_POST['title'];} else {$title = "";}
	if(isset($_POST['key'])) {$key = $_POST['key'];} else {$key = "";}

	// Setup database connection
	$dbname='../base';
	$mytable ="file_store";
	$base=new SQLite3($dbname);

	// Do the query
	$query = "SELECT * FROM $mytable WHERE ID = $filename";
	$results = $base->query($query);
	$row = $results->fetchArray();
	if($row) {
		$query = "	UPDATE $mytable 
					SET code_title='$title', 
						code_extension='$extension', 
						code_author='$author', 
						code_date='$date', 
						code_password='$key', 
						editor_background='$background' 
					WHERE ID='$filename'
				 ";
		$results = $base->exec($query);
	} else {
		$query = "INSERT INTO $mytable(ID, code_title, code_extension, code_author, code_date, code_password, editor_background)
                VALUES ('$filename', '$title', '$extension', '$author', '$date', '$key', '$background')";
		$results = $base->exec($query);
	}

	// Save the actual file
	file_put_contents($filename . ".code" , $content); 
	
	echo(json_encode($row));
?>