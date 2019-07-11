<?php
class Comment {
    function Comment($title, $alias, $comment, $id) {
        $this->title = $title;
        $this->name = $alias;
        $this->comment = $comment;
        $this->likes = 0;
        $this->datetime = date(DATE_ISO8601);
        $this->comments = [];
        $this->id = $id;
    }
}
if (!array_key_exists("a", $_POST))
    exit("No action defined");

if (($_POST["a"] === "like" || $_POST["a"] === "unlike") && array_key_exists("type", $_POST) && array_key_exists("name", $_POST)) {
    $type = $_POST["type"];
    $subpath = null;
    if ($type === "article")
        $subpath = "articles";
    else if ($type === "term")
        $subpath = "terms";
    else
        exit("Unknown type: " . $type);
    
    if (array_key_exists("commentId", $_POST))
        $path = "data/" . $subpath . "/" . $_POST["name"] . "/comments.json";
    else
        $path = "data/" . $subpath . "/" . $_POST["name"] . "/metadata.json";
    $file = fopen($path, "r")
        or exit("Unable to open file: " . $path);
    $content = json_decode(fread($file, filesize($path)), false);
    $obj = $content;
    if (array_key_exists("commentId", $_POST)) {
        // exit("Comment-id: " . $_POST["commentId"]);
        for ($i = 0, $length = count($content); $i < $length; $i++) {
            if ($content[$i]->id === ($_POST["commentId"]))
                $obj = $content[$i];
        }

    } if ($_POST["a"] === "like")
        $obj->likes++;
    else
        $obj->likes--;
    $file = fopen($path, "w");
    fwrite($file, json_encode($content));
    fclose($file);
    exit("success");
} else if ($_POST["a"] === "postComment" && array_key_exists("type", $_POST) && array_key_exists("name", $_POST)
&& array_key_exists("title", $_POST) && array_key_exists("alias", $_POST) && array_key_exists("comment", $_POST)) {
    $type = $_POST["type"];
    $subpath = null;
    if ($type === "article")
        $subpath = "articles";
    else if ($type === "term")
        $subpath = "terms";
    else
        exit("Unknown type: " . $type);
    
    if (!$_POST["title"] || !$_POST["alias"] || !$_POST["comment"])
        exit("Undefined argument(s) (title: " . $_POST["title"] . 
        ", alias: " . $_POST["alias"] . ", comment: " . $_POST["comment"] . ")");
    
    $path = "data/" . $subpath . "/" . $_POST["name"] . "/comments.json";
    $commentfile = fopen($path, "r")
        or exit("Unable to open file: " . $path);

    $obj = json_decode(fread($commentfile, filesize($path)), false);
    array_unshift($obj, new Comment($_POST["title"], $_POST["alias"], $_POST["comment"], strval(count($obj))));
    $commentfile = fopen($path, "w");

    $path = "data/" . $subpath . "/" . $_POST["name"] . "/metadata.json";
    $metafile = fopen($path, "r")
        or exit("Unable to open file: " . $path);
    
    fwrite($commentfile, json_encode($obj));
    fclose($commentfile);
    
    $obj = json_decode(fread($metafile, filesize($path)), false);
    $obj->comments++;
    $metafile = fopen($path, "w");
    fwrite($metafile, json_encode($obj));
    fclose($metafile);
    exit("success");
}

exit("Unknown action-type");
?>