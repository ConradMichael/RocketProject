var toTest = [];

var currentTable;

var isAdmin=false;

function loadJSON(){
	var request = new XMLHttpRequest();
	
	request.open('GET', 'http://192.168.1.114:8090/api/launches');
	
	request.setRequestHeader('Content-Type', 'application/json');     
	request.setRequestHeader('Access-Control-Allow-Origin', '*');
	
	request.responseType = 'json';
	
	request.send();

	request.onload = function(){
		
	toTest = request.response;
	
	currentTable = 1;
	}
}

function login(usr){
	console.log(usr);
	if(usr == "admin"){
		isAdmin = true;
		userChange(usr);
	} else if(usr == "logout"){
		isAdmin = false;
		userChange(usr);
	} else {
		isAdmin = false;
		userChange();
	}
}


function userChange(usr){	
	if(usr == "admin"){
		document.getElementById("login").style.display="none";
		document.getElementById("adminBar").style.display="block";
		document.getElementById("guestBar").style.display="none";
		document.getElementById("logout").style.display="block";
	} else if(usr == "logout"){
		document.getElementById("login").style.display="value";
		document.getElementById("adminBar").style.display="none";
		document.getElementById("guestBar").style.display="block";
		document.getElementById("logout").style.display="none";
	} else {
		document.getElementById("login").style.display="none";
		document.getElementById("adminBar").style.display="none";
		document.getElementById("guestBar").style.display="block";
		document.getElementById("logout").style.display="block";
	}
}

function addLaunch(){
	var request = new XMLHttpRequest();
	
	request.open('POST', 'http://192.168.1.114:8090/api/addLaunch', true);
	
	request.setRequestHeader('Content-Type', 'application/json');     
	request.setRequestHeader('Access-Control-Allow-Origin', '*');
	
	
	lTitle = " ";
	lDescription = " ";
	lCost = " ";
	lLocation = " ";
	
	
	lTitle = document.getElementById("launchTitle").value;
	lDescription = document.getElementById("launchDescription").value;
	lCost = document.getElementById("launchCost").value;
	lLocation= document.getElementById("launchLocation").value;
	
	console.log(lTitle);
	console.log(lDescription);
	console.log(lCost);
	console.log(lLocation);
	
	jsonString = JSON.stringify({'title':lTitle,'description':lDescription,'cost':lCost,'location':lLocation})
	
	request.send(jsonString);
	
	loadJSON();
	getAllLaunches();
}

function switchGoogleMapsSearch(country){
	var srcMain = " ";
	var mapsString = " ";
	if(country == "All"){
		srcMain = "https://www.google.com/maps/d/embed?mid=1tCovoW3LRy1yDmGdzahp_3rhv-k";
		mapsString += "<iframe width='1400' height='800' align='middle' src=" + srcMain + " allowfullscreen></iframe>";
	} else {
		srcMain = "https://www.google.com/maps/embed/v1/search?key=AIzaSyB2r0E7QlqxCiLzPlsuuCFJGp4RXjBHbOk&q=rocket+launch+site+in+"+country;
		mapsString += "<iframe width='1400' height='800' align='middle' src=" + srcMain + " allowfullscreen></iframe>";
	}
	var maps = document.getElementById("launchMaps");

	console.log(mapsString);
	
	maps.innerHTML = mapsString;
}

function launchSwitch(pID){
	var AddLaunches = document.getElementById("newLaunch");
	var FullTable = document.getElementById("ToInsert");
	
	if(pID == "All"){
		AddLaunches.style.display = "none";
		FullTable.style.display = "block";
	} else if(pID == "Add"){
		AddLaunches.style.display = "block";
		FullTable.style.display = "none";
	}
}

function changeTable(tID){
	var table1 = document.getElementById("myTable1");
	var table2 = document.getElementById("myTable2");
	var table3 = document.getElementById("myTable3");
	
	tochange = 1;
	
	if(tID == "Next" && (currentTable != 3)){
		tochange = currentTable += 1;
	} else if(tID == "Previous" && (currentTable != 1)){
		tochange = currentTable -= 1;
	} else {
		tochange = tID;
	}
	
	if(tochange == 1){
			currentTable = 1;
			table1.style.display = "block";
			table2.style.display = "none";
			table3.style.display = "none";
	} else if (tochange == 2){
			currentTable = 2;
			table1.style.display = "none";
			table2.style.display = "block";
			table3.style.display = "none";
	} else if (tochange == 3){
			currentTable = 3;
			table1.style.display = "none";
			table2.style.display = "none";
			table3.style.display = "block";
	} 
}

function getAllLaunches(){
	loadJSON();
	var table = document.getElementById("myTable1");

	hitcount = 0;
	
	table.innerHTML = " ";
	
	console.log(toTest.length);
	
	for(i = 0; i < toTest.length; i++){
		var row = table.insertRow(-1);
		
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		
		cell1.innerHTML = toTest[i].id;
		cell2.innerHTML = toTest[i].title;
		cell3.innerHTML = toTest[i].description;
		cell4.innerHTML = toTest[i].cost;
		cell5.innerHTML = toTest[i].location;
	}
}