function loadRecommendedArticles (articles) {
    let container = document.getElementById("articles");
    container.innerHTML = "";
    for (let i = 0, len = articles.length; i < len; i++) {
        if (articles[i]) {
            let artEl = document.createElement("article");
            artEl.classList.add("mini-post");
            loadArticlePreviewSmall(articles[i], artEl);
            container.appendChild(artEl);
        }
    }
}
function loadRecommendedTerms (terms) {
    let container = document.getElementById("terms");
    container.innerHTML = "";
    for (let i = 0, len = terms.length; i < len; i++) {
        if (terms[i]) {
            let termEl = document.createElement("li");
            loadTermPreview(terms[i], termEl);
            container.appendChild(termEl);
        }
    }
}

function loadArticlePreviewSmall (art, artEl) {
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
                    <h3><a href='read.php?article=" + art + "'>" + metadata.title + "</a></h3> \
                    <time class='published' datetime='" + metadata.datetime + "'>" + formatDate(date) + ", " + formatTime(date) + "</time> \
                    <a href='#' class='author'><img src='' alt='' /></a> \
                </header> \
                <a href='read.php?article=" + art + "' class='image'><img src='images/thumbnails/" + metadata.imagePoster + "' alt='' /></a>";
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    /* res = analyzeResponseFromGet(this.responseText, "data/user/" + metadata.author + ".json");
                    if (res === false)
                        return; */
                    let user = JSON.parse(this.responseText);
                    let authorElement = artEl.getElementsByClassName("author")[0];
                    authorElement.firstElementChild.src = "images/avatars/" + user.avatar;
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
function loadTermPreview (term, termEl) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* res = analyzeResponseFromGet(this.responseText, "data/terms/" + term + "/metadata.json");
            if (res === false)
                return; */
            let metadata = JSON.parse(this.responseText);

            let date = new Date(metadata.datetime);
            termEl.innerHTML =
                "<article> \
                    <header> \
                        <h3><a href='read.php?term=" + term + "'>" + metadata.title + "</a></h3> \
                        <time class='published' datetime='" + metadata.datetime + "'>" + formatDate(date) + ", " + formatTime(date) + "</time> \
                    </header> \
                    <a href='read.php?term=" + term + "' class='image'><img src='images/thumbnails/" + metadata.imagePoster + "' alt='' /></a> \
                </article>";
        }
    };
    xhttp.open("GET", "data/terms/" + term + "/metadata.json", true);
    noCache(xhttp);
    xhttp.send();
}