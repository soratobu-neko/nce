var projects;
var newLine;
var newProject;
var splitName;
var newDAP;
var newID;
var newLink;
var np;
var e;

if (getCookie("li") === "" || getCookie("li") === undefined) {
    window.location.replace("./index.html");
} else {
    var data = null;
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            showData(JSON.parse(xhr.responseText));
        }
    });
    
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
};

document.querySelector(".btn-lo").onclick = function () {
    setCookie("li", "", 1);
    window.location.replace("./index.html");
};

document.getElementById("account").onclick = function() {
    window.location.replace("./account.html");
};

function createNewProjectData(path, api, success, name) {
   var equal = window.np + 1;
   window.np = equal;
   var data = JSON.stringify({
      "name": name,
      "account": getCookie("li") + ":" + window.np,
      "html": "",
      "css": "",
      "js": "",
      "shared": "",
      "sources": []
   });
   
   var xhr2 = new XMLHttpRequest();
   xhr2.withCredentials = false;
   
   xhr2.addEventListener("readystatechange", function () {
      if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 201) {
         document.getElementById("new").innerHTML = "Create";
         success("https://zball-ec41.restdb.io/rest/editor", "6228c7c7dced170e8c83a0b8", openNewProject);
      }
   });
   
   xhr2.open("POST", path);
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
            success(JSON.parse(xhr3.responseText));
        }
    });
    
    xhr3.open("GET", path);
    xhr3.setRequestHeader("content-type", "application/json");
    xhr3.setRequestHeader("x-apikey", api);
    xhr3.setRequestHeader("cache-control", "no-cache");
    
    xhr3.send(data);
}

function openNewProject(Data) {
    var count = 0-1;
    var splitAccount;
    // alert(window.np);
    Array.from({length: Data.length}, () => {
        count += 1;
        splitAccount = Data[count].account.split(":");
        // alert(splitAccount);
        // alert(splitAccount[0]);
        // alert(splitAccount[1]);
        if (getCookie("li") == splitAccount[0] && window.np == splitAccount[1]) {
            saveEditor(Data[count]._id, projects, window.np);
        } else {
            // alert("error");
        }
    });
}

function saveEditor(id, edit, editors) {
    if (projects != "") {
        var data2 = JSON.stringify({
        "editor":  edit + ";" + id + ":" + document.getElementById("name").value,
        "editors": editors
        });
    } else {
        var data2 = JSON.stringify({
            "editor": id + ":" + document.getElementById("name").value,
            "editors": editors
        });
    }
    
    var xhr4 = new XMLHttpRequest();
    xhr4.withCredentials = false;
    
    xhr4.addEventListener("readystatechange", function () {
        if (xhr4.readyState === XMLHttpRequest.DONE && xhr4.status === 200) {
            console.log("saved to account.");
            window.location.replace("./editor.html?id=" + id);
        }
    });
    
    xhr4.open("PUT", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
    xhr4.setRequestHeader("content-type", "application/json");
    xhr4.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr4.setRequestHeader("cache-control", "no-cache");
    
    xhr4.send(data2);
}

function checkTime(did, d) {
    var dap = d.split("/.///.//");
    var newDate = new Date();
    var oldDate = new Date(dap[0]);
            
    var diffseconds = Math.floor((oldDate.getTime() - newDate.getTime()) / 1000);
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
            
    days = Math.floor(diffseconds / (3600*24));
    hours   = Math.floor(diffseconds / 3600);
    minutes = Math.floor(diffseconds / 60);
    seconds = Math.floor(diffseconds);
            
    if (days != -1) {
        document.getElementById(did).innerHTML = " Opened " + Math.abs(days) + " Days Ago By " + dap[1];
    } else if (hours != -1) {
        document.getElementById(did).innerHTML = " Opened " + Math.abs(hours) + " Hours Ago By " + dap[1];
    } else if (minutes != -1) {
        document.getElementById(did).innerHTML = " Opened " + Math.abs(minutes) + " Minutes Ago By " + dap[1];
    } else {
        document.getElementById(did).innerHTML = " Opened " + Math.abs(seconds) + " Seconds Ago By " + dap[1];
    }
}

function loadTimestamp(aid) {
    var data6 = null;
    
    var xhr6 = new XMLHttpRequest();
    xhr6.withCredentials = false;
    
    xhr6.addEventListener("readystatechange", () => {
        if (xhr6.readyState === XMLHttpRequest.DONE && xhr6.status === 200) {
            var newData = JSON.parse(xhr6.responseText);
            
            var dt = newData.opened;
    
            if (dt != undefined) {
                checkTime(aid, dt);
            } else {
                document.getElementById(aid).innerHTML = " Not Opened Recently";
            }
        }
    });
    
    xhr6.open("GET", "https://zball-ec41.restdb.io/rest/editor/" + aid);
    xhr6.setRequestHeader("content-type", "application/json");
    xhr6.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr6.setRequestHeader("cache-control", "no-cache");
    
    xhr6.send(data6);
}

function showData(Data) {
    window.projects = Data.editor;
//     document.getElementById("account").src = Data.pfp;
//     document.getElementById("account").style.width = "40px";
//     document.getElementById("account").style.height = "40px";
    window.np = Data.editors;
    if (projects != "" && projects.indexOf(";") != -1) {
       var splitData = projects.split(";");
       splitData.forEach((project) => {
           if (project != "") {
                splitName = project.split(":");
                newProject = document.createElement("div");
                newProject.setAttribute("class", "project");
                newLine = document.createElement("br");
                newDAP = document.createElement("p");
                newID = document.createElement("p");
                newLink = document.createElement("a");
                
                newLink.setAttribute("class", "project-btn");
                newLink.style = "color: blue; text-decoration: underline; font-weight: bold; cursor: pointer; font-family: Arial;";
                newLink.innerHTML = splitName[1];
                newDAP.setAttribute("id", splitName[0]);
                newDAP.innerHTML = "loading...";
                loadTimestamp(splitName[0]);
                newLink.href = "./editor.html?id=" + splitName[0];
                newID.innerHTML = "id: " + splitName[0];
                newID.style = "color: #555555; font-size: 0.6rem;";
                newDAP.style = "color: #555555; font-size: 0.6rem;";
                
           
                document.querySelector(".projects-container").appendChild(newLine);
                document.querySelector(".projects-container").appendChild(newProject);
                newProject.appendChild(newLink);
                newProject.appendChild(newDAP);
                newProject.appendChild(newID);
                document.getElementById("load").style.display = "none";
                document.getElementById("newProjectForm").style.display = "block";
           }
       });
       document.getElementById("project").innerHTML = "";
    } else if (projects != "") {
        splitName = projects.split(":");
        newProject = document.createElement("div");
        newProject.setAttribute("class", "project");
        newLine = document.createElement("br");
        newDAP = document.createElement("p");
        newID = document.createElement("p");
        newLink = document.createElement("a");
        
        newLink.innerHTML = splitName[1];
        newLine.setAttribute("class", "project-btn");
        newDAP.setAttribute("id", splitName[0]);
        newDAP.innerHTML = "loading...";
        loadTimestamp(splitName[0]);
        newLink.href = "./editor.html?id=" + splitName[0];
        newID.innerHTML = "id: " + splitName[0];
        newID.style = "color: #A9A9A9; font-size: 0.6rem;";
        newDAP.style = "color: #A9A9A9; font-size: 0.6rem;";
        newLink.style = "color: blue; text-decoration: underline; font-weight: bold; cursor: pointer; font-family: Arial;";
        
        document.querySelector(".projects-container").appendChild(newLine);
        document.querySelector(".projects-container").appendChild(newProject);
        newProject.appendChild(newLink);
        newProject.appendChild(newDAP);
        newProject.appendChild(newID);
        document.getElementById("load").style.display = "none";
        document.getElementById("newProjectForm").style.display = "block";
    } else {
        document.querySelector("#load").innerHTML = "No projects found.";
        document.getElementById("newProjectForm").style.display = "block";
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
