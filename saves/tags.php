<?php
	// Setup variables
	$tags = $_POST['tags'];

	// Setup database connection
	$dbname='../cb1856.db';
	$mytable ="tags";
	$base=new SQLite3($dbname);

	// Do the query
	$query = "SELECT  FROM $mytable WHERE tags like '%$tags%'";
	$results = $base->query($query);
	
	// Store results as an array
	$row = $results->fetchArray();
	
	// Set error conditions
	if(count($row) > 0) { // There is data
		$row[0]['error'] = false;
	} else { // There is no data
		$row[0]['error'] = true;
	}
	
	// echo data
	echo json_encode($row);
	
	
	
	
	/*
	    $count = 0;
		if(count($row) > 0) {
			foreach($row as $entry){
				$data[$count]['filename'] = $entry["ID"];
				$count  = $count + 1;
			}
			$data[0]['count'] = $count;
			$data[0]['error'] = false;
		} else {
			$data[0]['error'] = true;
		}
	*/	
	//echo var_dump($row);
	//echo json_encode($data);
?>