<?php
	// Setup variables
	$filename = $_POST['filename'];

	// Setup database connection
	$dbname='../base';
	$mytable ="file_store";
	$base=new SQLite3($dbname);

	// Do the query
	$query = "SELECT * FROM $mytable WHERE ID = $filename";
	$results = $base->query($query);
	$row = $results->fetchArray();
	if(count($row) > 0) {
			$data['error'] = false;
			$data['key'] = $row["code_password"];
	} else {
		$data['error'] = true;
	}
	//echo var_dump($row);
	echo json_encode($data);
?>