<!DOCTYPE HTML>
<!--
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html lang="de">
	<head>
		<meta charset="utf-8" />
		<title>Wissenschaft einfach erklärt</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<!-- <link rel="stylesheet" href="assets/css/mymain.css" /> -->
		<link rel="icon" href="images/logo.png" type="image/x-icon">
	</head>
	<body class="is-preload">
		<?php
			include "header.php";
		?>
		<!-- Wrapper -->
			<div class="wrapper flexreverse">

				<!-- Main -->
					<div id="main" class="main">

						<!-- Pagination -->
							<!--<ul class="actions pagination">
								<li><a href="" class="disabled button large previous">Vorherige Seite</a></li>
								<li><a href="#" class="button large next">Nächste Seite</a></li>
							</ul>-->

					</div>

				<!-- Sidebar -->
					<section id="sidebar" class="sidebar">

						<!-- Intro -->
							<section id="intro">
								<a href="#" class="logo"><img src="images/logo.png" alt="" /></a>
								<header>
									<h2>Wissenschaft einfach erklärt</h2>
									<p>Artikel über verschiedene wissenschaftliche Themen in möglichst einfacher Sprache und mit Begriffserklärungen</p>
								</header>
							</section>

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

						<!-- About -->
							<section class="blurb">
								<h2>Über mich</h2>
								<p>Ich bin ein Physik-Student im 6. Semester und begeistere mich unter anderem für allerlei Naturwissenschaften.</p>
								<ul class="actions">
									<li><a href="#" class="button">Mehr</a></li>
								</ul>
							</section>

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

					</section>

			</div>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>
			<script src="assets/js/general.js"></script>
			<script src="assets/js/load_main.js"></script>
			<script src="assets/js/load_sidebar.js"></script>
			<script>
				loadMainpageInfo(function (mainpageInfo) {
					loadRecentArticles(mainpageInfo.recentArticles);
					loadRecommendedArticles(mainpageInfo.recommendedArticles);
					loadRecommendedTerms(mainpageInfo.recommendedTerms);
				});
			</script>
	</body>
</html>