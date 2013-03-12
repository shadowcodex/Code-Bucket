
<?php

	$dbname='base';
	$mytable ="file_store";
	 
	if(!class_exists('SQLite3'))
	   die("SQLite 3 NOT supported.");
	 
	$base=new SQLite3($dbname, 0666);
	 
	$query = "CREATE TABLE $mytable(
	            ID int(20) NOT NULL PRIMARY KEY,
	            code_author VARCHAR(255) NOT NULL,           
	            code_date datetime,
	            code_extension VARCHAR(255),
	            code_title text,
	            code_password VARCHAR(255)          
	            )";
	             
	$results = $base->exec($query);


	echo "The database was created and table was made.";
	echo "Aaaaaand... Your good to go. Please delete install.php now!";

?>