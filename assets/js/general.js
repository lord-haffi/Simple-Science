const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
let liked = (function () {
    let item = window.localStorage.getItem("liked");
    // console.log("localStorage-item: " + item);
    return item === null ? new Set() : new Set(item.split("|"));
})();
//liked.delete("undefined");
window.addEventListener("unload", function () {
    if (liked.size === 0) {
        window.localStorage.removeItem("liked");
        return;
    }
    let item = "";
    liked.forEach(function(value) {
        //console.log(typeof value + ": " + value + "|");
        item += value + "|";
    });
    window.localStorage.setItem("liked", item.substr(0, item.length-1));
    // console.log("Saved to localStorage: " + item);
});


function formatDate (date) {
    return days[date.getDay()].substr(0, 2) + ", " + date.getDate().toString().padStart(2, '0') + "." +
        (date.getMonth()+1).toString().padStart(2, '0') + "." + date.getFullYear();
}
function formatTime (date) {
    return date.getHours().toString().padStart(2, '0') + ":" +
        date.getMinutes().toString().padStart(2, '0') + " Uhr";
}
function action (action, params, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let resp = this.responseText;
            if (resp === "success") {
                callback();
            } else
                alert("Error: " + resp);
        }
    };
    xhttp.open("POST", "action.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let paramList = "a=" + action;
    params.forEach(function(el) {
        paramList += "&" + el[0] + "=" + el[1];
    });
    xhttp.send(paramList);
}
function like (file, type, likeEl, commentId=undefined) {
    // let likeEl = document.getElementById(domID);
    let paramList = [["name", file], ["type", type]];
    if (commentId)
        paramList.push(["commentId", commentId]);
    if (liked.has(file + (commentId > -1 ? "c" + commentId : "")))
        action("unlike", paramList, function() {
            liked.delete(file + (commentId > -1 ? "c" + commentId : ""));
            likeEl.innerHTML = Number(likeEl.innerHTML) - 1;
            likeEl.classList.remove("active");
        });
    else
        action("like", paramList, function() {
            liked.add(file + (commentId > -1 ? "c" + commentId : ""));
            likeEl.innerHTML = Number(likeEl.innerHTML) + 1;
            likeEl.classList.add("active");
        });
}
function noCache (xhttp) {
    xhttp.setRequestHeader("Cache-Control", "no-store, must-revalidate"); // HTTP 1.1.
    xhttp.setRequestHeader("Expires", "0"); // Proxies.
}
function loadMainpageInfo (callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* res = analyzeResponseFromGet(this.responseText, "data/mainpage_info.json");
            if (res === false)
                return; */
            let mainpageInfo = JSON.parse(this.responseText);
            callback(mainpageInfo);
        }
    };
    xhttp.open("GET", "data/mainpage_info.json", true);
    noCache(xhttp);
    xhttp.send();
}
/* function analyzeResponseFromGet (responseText, file) {
    ind = responseText.lastIndexOf(";");
    resp = responseText.substring(0, ind);
    if (responseText.endsWith("fail")) {
        alert("Error while loading '" + file + "': " + resp);
        return false;
    } else if (!responseText.endsWith("success")) {
        alert("The data may got corrupted during transfer.\n\
            Illegal ending in data: " + responseText.substring(ind));
        return false;
    }
    return resp;
} */