<?php 
	$filename = $_POST['filename'];
	$extension = $_POST['extension'];
	$content = $_POST['contents'];
	$time = null; // get time stamp
	
	if($_POST['author'] != "") {$author = $_POST['author'];}
	if($_POST['title'] != "") {$title = $_POST['title'];}
	if($_POST['key'] != "") {$password = $_POST['key'];}

	file_put_contents($filename . ".code" , $content); 

	$query = "INSERT INTO $mytable(ID, post_title, post_content, post_author, post_date, guid)
                VALUES ('$number', '$title', '$content', '$author', '$date', '$url')";
	$results = $base->exec($query);
?>