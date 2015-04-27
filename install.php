
<?php

	$dbname='cb1856.db';
	$mytable ="file_store";
	$mytable2 = "tags";
	 
	if(!class_exists('SQLite3')) die("SQLite 3 NOT supported.");
	 
	$base=new SQLite3($dbname);
	 
	$query = "CREATE TABLE $mytable(
	            ID int(20) NOT NULL PRIMARY KEY,
	            code_author VARCHAR(255),           
	            code_date datetime,
	            code_extension VARCHAR(255),
	            code_title text,
	            code_password VARCHAR(255),
	            editor_background int(1)         
	            )";
	             
	$results = $base->exec($query);
	
	$query2 = "CREATE TABLE $mytable2(
	            ID int(20) NOT NULL PRIMARY KEY,
	            tags VARCHAR(500)       
	            )";
	
	$results = $base->exec($query2);


	echo "The database was created and table was made.";
	echo "Aaaaaand... Your good to go. Please delete install.php now!";
	

?>