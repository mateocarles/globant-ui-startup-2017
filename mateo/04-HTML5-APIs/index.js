 
var saveBtn = document.getElementById('save');
var showBtn = document.getElementById('show');
var eraseBtn = document.getElementById("erase");
var cont = document.getElementById('txt');
var par = document.getElementById("par");
var saveBtnDb = document.getElementById("savedb");
var showBtnDb= document.getElementById("showdb");
var eraseBtnDb = document.getElementById("erasedb");

saveBtn.addEventListener('click', function() {
    localStorage.setItem("text",cont.value);
    /*  This will store data with no expiration date
        so if we close the tab and open it again, if
        we click on Show Content it will show the last 
        value of the textArea.     */ 
}, false);

showBtn.addEventListener('click', function() {
    if(localStorage.text === undefined) {
        par.innerHTML = "There is nothing saved!"
    } else {
        par.innerHTML = localStorage.text;
    }        
}, false);

eraseBtn.addEventListener('click', function() {
   par.innerHTML = " ";
   localStorage.clear();
}, false);




var db;
let request = indexedDB.open("txt", 1);
 
request.onupgradeneeded = function(event) {

    console.log("onupgradeneeded");
    let dbb = event.target.result; 
    if (!dbb.objectStoreNames.contains("txts")) {
        console.log("I need to make a new 'text' objectstore"); 
        var objectStore = dbb.createObjectStore("txts", {
            autoIncrement: true
         });
       }
}
 
request.onsuccess = function(event) {     
     db = request.result;
}

saveBtnDb.addEventListener('click', function() {

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    if (!window.indexedDB) {
     window.alert("Your browser doesn't support a stable version of IndexedDB.");
    }    
    let transaction = db.transaction(["txts"], "readwrite");
    let objectStore = transaction.objectStore("txts");
 
    let text = document.getElementById("txt").value;
    let dbRequest = objectStore.add(text);
    dbRequest.onsuccess = function(event) {
        console.log("insert is done")
        console.log("the result quantity of stored textes is: " + dbRequest.result);
    }
}, false);


showBtnDb.addEventListener('click', function() {
     let request = db.transaction(["txts"], "readonly").objectStore("txts").openCursor();
     console.log("Content of your DB:");

     request.onerror = function(event) {
       alert("Unable to retrieve data from database!");
     };
     request.onsuccess = function(event) {
       var cursor = event.target.result;          
       if(cursor) {
         console.log(cursor.value);
         cursor.continue();
       } else {
         alert("Data retrived, view console");
       }
     }
   
}, false);

eraseBtnDb.addEventListener('click', function() {
   
    db.transaction(["txts"], "readwrite").objectStore("txts").clear();
    console.log("All DB's data was deleted");


}, false);


//ex 3
var dropzone = document.getElementById('dropZone');
dropzone.addEventListener("dragover",FileDragHover,false);
dropzone.addEventListener("dragleave", FileDragHover,false);
dropzone.addEventListener("drop",FileSelectHandler,false);

function FileSelectHandler(e) {
    alert("file droped");
	//cancel event and hover styling
	FileDragHover(e);	
	var files = e.dataTransfer.files;
    reader = new FileReader();
    reader.onload = function(event) {        
        cont.value = event.target.result;     //cont is the txtarea above.   
    }
    reader.readAsText(files[0],"UTF-8");
}


function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function higlight() {
    dropzone.style('background-color','#ccc')
}

