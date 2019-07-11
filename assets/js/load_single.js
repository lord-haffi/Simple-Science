let type, file, subpath;
let comments;

function loadData (filename, typep) {
    if (!filename || !typep) return;

    file = filename;
    type = typep;
    if (type === "article")
        subpath = "articles";
    else if (type === "term")
        subpath = "terms";
    else
        return;
    let path = "data/" + subpath + "/" + file;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* res = analyzeResponseFromGet(this.responseText, path + "/metadata.json'");
            if (res !== false) */
            setMetadata(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", path + "/metadata.json", true);
    noCache(xhttp);
    xhttp.send();
    
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* res = analyzeResponseFromGet(this.responseText, path + "/content.html");
            if (res !== false) */
            setContent(this.responseText);
        }
    };
    xhttp.open("GET", path + "/content.html", true);
    noCache(xhttp);
    xhttp.send();
    
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* res = analyzeResponseFromGet(this.responseText, path + "/comments.json'");
            if (res !== false) */
            setComments(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", path + "/comments.json", true);
    noCache(xhttp);
    xhttp.send();
}

function setContent (content) {
    document.getElementById("content").innerHTML += content;
}

function setMetadata (metadata) {
    document.title = metadata.title + " - " + document.title;
    document.getElementById("title").innerHTML = metadata.title;
    document.getElementById("subtitle").innerHTML = metadata.subtitle;
    let contEl = document.getElementById("content");
    contEl.innerHTML = "<p>" + metadata.intro + "</p>" + contEl.innerHTML;

    let date = new Date(metadata.datetime);
    document.getElementById("published").datetime = metadata.datetime;
    document.getElementById("date").innerHTML = formatDate(date);
    document.getElementById("time").innerHTML = formatTime(date);
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* res = analyzeResponseFromGet(this.responseText, "data/user/" + metadata.author + ".json");
            if (res === false)
                return; */
            let user = JSON.parse(this.responseText);
            document.getElementById("authorAlias").innerHTML = user.alias;
            document.getElementById("authorAvatar").src = "images/avatars/" + user.avatar;
        }
    };
    xhttp.open("GET", "data/user/" + metadata.author + ".json", true);
    noCache(xhttp);
    xhttp.send();

    let poster = document.getElementById("poster");
    poster.src = "images/thumbnails/" + metadata.imagePoster;
    poster.alt = "Artikel Thumbnail";
    let likeEl = document.getElementById("likes");
    likeEl.innerHTML = metadata.likes;
    if (liked.has(file))
        likeEl.classList.add("active");
    likeEl.addEventListener("click", function () {
        like(file, type, likeEl);
    });
    
    comments = metadata.comments;
    document.getElementById("comments").innerHTML = comments;
}

function setComments (comments) {
    let container = document.getElementById("commentsection");

    for (let i = 0, len = comments.length; i < len; i++) {
        if (comments[i]) {
            let commentEl = document.createElement("article");
            commentEl.classList.add("comment");
            commentDOM(commentEl, comments[i].id, comments[i].title, new Date(comments[i].datetime), comments[i].name,
            comments[i].comment, comments[i].likes);
            // setComment(comments[i], commentEl);
            container.appendChild(commentEl);
        }
    }
}

// function setComment (comment, commentEl) {
//     let date = new Date(comment.datetime);
//     commentEl.innerHTML = "<header> \
//                             <div class='title'> \
//                                 <h2>" + comment.title + "</h2> \
//                             </div> \
//                             <div class='meta'> \
//                                 <time class='published' datetime='" + comment.datetime + "'> \
//                                     <div id='date'>" + formatDate(date) + "</div> \
//                                     <div id='time'>" + formatTime(date) + "</div> \
//                                 </time> \
//                                 <a href='#' class='author'><span class='name'>" + comment.name + "</span></a> \
//                             </div> \
//                         </header> \
//                         <div>" + comment.comment.replace("\n", "<br>") + "</div> \
//                         <footer> \
//                             <ul class='stats'> \
//                                 <li><button id='likes" + comment.datetime + "' onclick='' class='simple icon fa-heart'>" + comment.likes + "</button></li> \
//                                 <li><span id='comments' class='icon fa-comment'>0</span></li> \
//                             </ul> \
//                         </footer>";
// }
function commentDOM (commentEl, commentId, title, date, name, text, likes) {
    commentEl.innerHTML = "<header> \
                            <div class='title'> \
                                <h2>" + title + "</h2> \
                            </div> \
                            <div class='meta'> \
                                <time class='published' datetime='" + date.toISOString() + "'> \
                                    <div id='date'>" + formatDate(date) + "</div> \
                                    <div id='time'>" + formatTime(date) + "</div> \
                                </time> \
                                <a href='#' class='author'><span class='name'>" + name + "</span></a> \
                            </div> \
                        </header> \
                        <div>" + text.replace("\n", "<br>") + "</div> \
                        <footer> \
                            <ul class='stats'> \
                                <li><button onclick=\"like('" + file + "', '" + type + "', this, '" + commentId + "')\" class='simple icon fa-heart" + (liked.has(file + "c" + commentId) ? " active" : "") + "'>" + likes + "</button></li> \
                                <li><span id='comments' class='icon fa-comment'>0</span></li> \
                            </ul> \
                        </footer>";
}

function postComment () {
    // let form = document.getElementById("commentForm");
    let title = document.getElementById("commentTitle").value,
    alias = document.getElementById("commentAlias").value,
    comment = document.getElementById("commentText").value;
    action("postComment", [["type", type], ["name", file], ["title", title],
    ["alias", alias], ["comment", comment]], function() {
        // let container = document.getElementById("commentsection");
        // let commentEl = document.createElement("article");
        // commentEl.classList.add("comment");
        // commentDOM(commentEl, title, new Date(), alias, comment, 0);
        // container.insertBefore(commentEl, container.firstChild);
        // document.getElementById("comments").innerHTML = ++comments;
        location.reload();
    });
}