<?php
$id = $_GET['id'];

$xml2=simplexml_load_file("http://gateway.moviefone.com/movies/ast/movie.xml?id=".$id);
echo $xml2->xpath("/results")[0]->movie->poster;
?>