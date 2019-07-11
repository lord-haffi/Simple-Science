function loadRecentArticles (articles) {
    let container = document.getElementById("main");
    // container.innerHTML = "";
    for (let i = 0, len = articles.length; i < len; i++) {
        if (articles[i]) {
            let artEl = document.createElement("article");
            artEl.classList.add("post");
            loadArticlePreviewBig(articles[i], artEl);
            container.appendChild(artEl);
        }
    }
}
function loadArticlePreviewBig (art, artEl) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* res = analyzeResponseFromGet(this.responseText, "data/articles/" + art + "/metadata.json");
            if (res === false)
                return; */
            
            let metadata = JSON.parse(this.responseText);

            let date = new Date(metadata.datetime);
            artEl.innerHTML =
                "<header> \
                    <div class='title'> \
                        <h2><a href='read.php?article=" + art + "'>" + metadata.title + "</a></h2> \
                        <p>" + metadata.subtitle + "</p> \
                    </div> \
                    <div class='meta'> \
                        <time class='published' datetime=''> \
                            <div>" + formatDate(date) + "</div> \
                            <div>" + formatTime(date) + "</div> \
                        </time> \
                        <a href='#' class='author'><span class='name'></span><img src='' alt='' /></a> \
                    </div> \
                </header> \
                <a href='read.php?article=" + art + "' class='image featured'><img src='images/thumbnails/" + metadata.imagePoster + "' alt='' /></a> \
                <p>" + metadata.intro + "</p> \
                <footer> \
                    <ul class='actions'> \
                        <li><a href='read.php?article=" + art + "' class='button large'>Weiterlesen</a></li> \
                    </ul> \
                    <ul class='stats'> \
                        <li><a href='#'>General</a></li> \
                        <li><button id='preview" + art + "' onclick=\"like('" + art + "', 'article', this)\" class='simple icon fa-heart" + (liked.has(art) ? " active" : "") + "'>" + metadata.likes + "</button></li> \
                        <li><span class='icon fa-comment'>" + metadata.comments + "</span></li> \
                    </ul> \
                </footer>";
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    /* res = analyzeResponseFromGet(this.responseText, "data/user/" + metadata.author + ".json");
                    if (res === false)
                        return; */
                    let user = JSON.parse(this.responseText);
                    let authorElement = artEl.getElementsByClassName("author")[0];
                    authorElement.firstElementChild.innerHTML = user.alias;
                    authorElement.lastElementChild.src = "images/avatars/" + user.avatar;
                }
            };
            xhttp.open("GET", "data/user/" + metadata.author + ".json", true);
            noCache(xhttp);
            xhttp.send();
        }
    };
    xhttp.open("GET", "data/articles/" + art + "/metadata.json", true);
    noCache(xhttp);
    xhttp.send();
}
/* function showLike(domID) {
    let likeEl = document.getElementById(domID);
    likeEl.innerHTML = Number(likeEl.innerHTML) + 1;
} */