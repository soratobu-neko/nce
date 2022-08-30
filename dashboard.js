var projects = "";

if (getCookie("li") === "" || getCookie("li") === undefined) {
    window.location.replace("./index.html")
} else {
    var data = null;
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            showData(JSON.parse(xhr.responseText));
        }
    })
    
    xhr.open("GET", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
}

document.getElementById("new").onclick = function() {
    if (document.getElementById("name").value != "") {
        document.getElementById("new").value = "creating...";
        createNewProjectData("https://zball-ec41.restdb.io/rest/editor", "6228c7c7dced170e8c83a0b8", getData, document.getElementById("name").value); 
    } else {
        alert("please enter a name!");
    }
}

document.querySelector(".btn-lo").onclick = function () {
    setCookie("li", "", 1);
    window.location.replace("./index.html")
}

function createNewProjectData(path, api, success, name) {
   var data = JSON.stringify({
      "name": name,
      "account": getCookie("li"),
      "html": "",
      "css": "",
      "js": "",
      "shared": ""
   })
   
   var xhr2 = new XMLHttpRequest();
   xhr2.withCredentials = false;
   
   xhr2.addEventListener("readystatechange", function () {
      if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 201) {
         document.getElementById("new").innerHTML = "Create";
         success("https://zball-ec41.restdb.io/rest/editor", "6228c7c7dced170e8c83a0b8", openNewProject);
      }
   })
   
   xhr2.open("POST", path)
   xhr2.setRequestHeader("content-type", "application/json");
   xhr2.setRequestHeader("x-apikey", api);
   xhr2.setRequestHeader("cache-control", "no-cache");
   
   xhr2.send(data);
}

function getData(path, api, success) {
    var data = null;
    
    var xhr3 = new XMLHttpRequest();
    xhr3.withCredentials = false;
    
    xhr3.addEventListener("readystatechange", function () {
        if (xhr3.readyState === XMLHttpRequest.DONE && xhr3.status === 200) {
            success(JSON.parse(xhr3.responseText))
        }
    })
    
    xhr3.open("GET", path);
    xhr3.setRequestHeader("content-type", "application/json");
    xhr3.setRequestHeader("x-apikey", api);
    xhr3.setRequestHeader("cache-control", "no-cache");
    
    xhr3.send(data);
}

function openNewProject(Data) {
    var count = 0-1;
    Array.from({length: Data.length}, () => {
        count += 1;
        if (getCookie("li") === Data[count].account) {
            saveEditor(Data[count]._id, projects);
            window.location.replace("./editor.html?id=" + Data[count]._id);
        }
    })
}

function saveEditor(id, edit) {
    if (projects != "") {
        var data = JSON.stringify({
            "editor":  edit + id + ":" + document.getElementById("name").value + ";"
        })
    } else {
        var data = JSON.stringify({
            "editor": id + ":" + document.getElementById("name").value + ";"
        })
    }
    
    var xhr4 = new XMLHttpRequest();
    xhr4.withCredentials = false;
    
    xhr4.addEventListener("readystatechange", function () {
        if (xhr4.readyState === XMLHttpRequest.DONE && xhr4.status === 200) {
            console.log("saved to account.")
        }
    })
    
    xhr4.open("PUT", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
    xhr4.setRequestHeader("content-type", "application/json");
    xhr4.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr4.setRequestHeader("cache-control", "no-cache");
    
    xhr4.send(data)
}

function showData(Data) {
    window.projects = JSON.stringify(Data.editor);
    if (projects != "") {
       var splitData = projects.split(";");
       splitData.forEach((project) => {
           if (project != "") {
                var splitName = project.split(":");
                var newProject = document.querySelector(".project").cloneNode(true);
                var newLine = document.createElement("br");
           
                newProject.innerHTML = splitName[1];
                newProject.href = "./editor.html?id=" + splitName[0];
           
                document.querySelector(".projects-container").appendChild(newLine);
                document.querySelector(".projects-container").appendChild(newProject);   
           }
       })
       document.getElementById("project").innerHTML = "";
    } else {
        document.querySelector(".project").innerHTML = "No projects available."
    }
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i < ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }
  
  function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}