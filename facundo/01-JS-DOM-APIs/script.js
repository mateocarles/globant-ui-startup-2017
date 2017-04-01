window.addEventListener("load", function() {
    document.getElementById("joke").addEventListener("click", loadJoke);
    document.getElementById("search").addEventListener("click", loadRepository);
}, false);

function fadein() {
    document.getElementById('1').className = 'sect';
}
function makeRequest(req) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(req.method, req.url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}
function loadJoke() {
    var obj = { method: "GET", url: "http://api.icndb.com/jokes/random", str: null };
    makeRequest(obj)
        .then(function (value) {
            content = JSON.parse(value)
            document.getElementById("1").innerHTML = content.value.joke
        })
        .catch(function (err) {
            console.error('Error!', err.statusText);
        });
}
function loadRepository() {
    var obj = { method: "GET", url: "https://api.github.com/search/repositories?q=" + document.getElementById("q").value };
    makeRequest(obj)
        .then(function (value) {
            content = JSON.parse(value)
            var arr = [];
            for (var i = 0; i < content.items.length; i++) {
                arr.push(content.items[i].full_name)
            }
            document.getElementById('lista').innerHTML = '<div id="titu"3>Lista de repositorios</div>';
            document.getElementById('lista').appendChild(makeUL(arr));
        })
        .catch(function (err) {
            console.error('Error!', err.statusText);
        });
}

function makeUL(array) {
    var list = document.createElement('ul');
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }
    return list;
}