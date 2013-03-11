
<?php

	$dbname='base';
	$mytable ="tablename";
	 
	if(!class_exists('SQLite3'))
	   die("SQLite 3 NOT supported.");
	 
	$base=new SQLite3($dbname, 0666);
	 
	$query = "CREATE TABLE $mytable(
	            ID bigint(20) NOT NULL PRIMARY KEY,
	            post_author bigint(20) NOT NULL,           
	            post_date datetime,
	            post_content longtext,
	            post_title text,
	            guid VARCHAR(255)           
	            )";
	             
	$results = $base->exec($query);

?>