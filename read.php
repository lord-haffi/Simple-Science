<!DOCTYPE HTML>
<!--
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html lang="de">
	<head>
		<title>Wissenschaft einfach erklärt</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<!-- <link rel="stylesheet" href="assets/css/mymain.css" /> -->
	</head>
	<!-- onunload="saveLocalStorageData()" -->
<body class="single is-preload">
	<?php
		include "header.php";
	?>

	<!-- Wrapper -->
	<div class="wrapper">
		<!-- Main -->
		<div class="main">
			<!-- Post -->
			<article class="post">
				<header>
					<div class="title">
						<h2 id="title"></h2>
						<p id="subtitle"></p>
					</div>
					<div class="meta">
						<time id="published" class="published" datetime="">
							<div id="date"></div>
							<div id="time"></div>
						</time>
						<a href="#" class="author"><span id="authorAlias" class="name"></span><img id="authorAvatar" src="" alt="" /></a>
					</div>
				</header>
				<span class="image featured"><img id="poster" src="" alt="" /></span>
				<div id="content"></div>
				<footer>
					<ul class="stats">
						<li><a href="#">General</a></li>
						<li><button id="likes" class="simple icon fa-heart">0</button></li>
						<li><span id="comments" class="icon fa-comment">0</span></li>
					</ul>
				</footer>
			</article>
		</div>
		<div class="wrapper">
			<section class="comment-section">
				<header>
					<h2>Kommentare</h2>
				</header>
				<form id="commentForm">
					<input id="commentTitle" type="text" placeholder="Titel"> 
					<input id="commentAlias" type="text" placeholder="Name / Alias">
					<textarea id="commentText" placeholder="Kommentar"></textarea>
					<input type="button" onclick="postComment()" value="Kommentar posten">
				</form>
				<ul id="commentsection" class="comments">
					
				</ul>
			</section>
			<!-- Sidebar -->
			<section id="sidebar" class="sidebar">
				<!-- Mini Posts -->
				<section>
					<div id="articles" class="mini-posts">

					</div>
				</section>
				<!-- Posts List -->
				<section>
					<ul id="terms" class="posts">
						
					</ul>
				</section>
			</section>
		</div>
		<!-- Footer -->
		<section id="footer">
			<ul class="icons">
				<li><a href="#" class="fa-twitter"><span class="label">Twitter</span></a></li>
				<li><a href="#" class="fa-facebook"><span class="label">Facebook</span></a></li>
				<li><a href="#" class="fa-instagram"><span class="label">Instagram</span></a></li>
				<li><a href="#" class="fa-rss"><span class="label">RSS</span></a></li>
				<li><a href="#" class="fa-envelope"><span class="label">Email</span></a></li>
			</ul>
			<p class="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>.</p>
		</section>
	</div>

	<!-- Scripts -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/browser.min.js"></script>
	<script src="assets/js/breakpoints.min.js"></script>
	<script src="assets/js/util.js"></script>
	<script src="assets/js/main.js"></script>
	<script src="assets/js/general.js"></script>
	<script src="assets/js/load_sidebar.js"></script>
	<script src="assets/js/load_single.js"></script>
	<?php
		if (array_key_exists("article", $_GET)) {
			$a = $_GET["article"];
			echo
				"<script>let article = " . ($a == null ? "undefined" : "'" . $a . "'") . ";" .
				"loadData(article, 'article');" .
				"</script>";
		} else if (array_key_exists("term", $_GET)) {
			$a = $_GET["term"];
			echo
				"<script>let term = " . ($a == null ? "undefined" : "'" . $a . "'") . ";" .
				"loadData(term, 'term');" .
				"</script>";
		}
	?>
	<script>
		loadMainpageInfo(function (mainpageInfo) {
			loadRecommendedArticles(mainpageInfo.recommendedArticles);
			loadRecommendedTerms(mainpageInfo.recommendedTerms);
		});
	</script>
</body>
</html>