var toTest = [];

var currentTable;

var isAdmin=false;

var launchId = 0;

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
		document.getElementById("login").style.display="contents";
		document.getElementById("adminBar").style.display="none";
		document.getElementById("guestBar").style.display="block";
		document.getElementById("logout").style.display="none";
		launchSwitch("All");
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
	
	lID = document.getElementById("launchID").value;
	lTitle = document.getElementById("launchTitle").value;
	lDescription = document.getElementById("launchDescription").value;
	lCost = document.getElementById("launchCost").value;
	lLocation= document.getElementById("launchLocation").value;

	lCompany = document.getElementById("launchCompany").value;
	lRocketLoad = document.getElementById("launchRocketLoad").value;
	lRocketType = document.getElementById("launchRocketType").value;
	lImgLink = document.getElementById("launchImgLink").value;
	lTime= document.getElementById("launchTime").value;
	
	jsonString = JSON.stringify(
	{
		'title':lTitle,
		'description':lDescription,
		'cost':lCost,
		'location':lLocation,
		'company':lCompany,
		'rocketload':lRocketLoad,
		'rockettype':lRocketType,
		'imagelink':lImgLink,
		'time':lTime
	})
	
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
	var AddLaunchesTemp = document.getElementById("newLaunchTemplate");
	var FullTable = document.getElementById("ToInsert");
	var FullTable2 = document.getElementById("ToInsert2");
	
	if(pID == "All"){
		AddLaunches.style.display = "none";
		AddLaunchesTemp.style.display = "none";
		FullTable.style.display = "block";
	} else if(pID == "Add"){
		AddLaunches.style.display = "block";
		AddLaunchesTemp.style.display = "block";
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
			table1.style.display = "contents";
			table2.style.display = "none";
			table3.style.display = "none";
	} else if (tochange == 2){
			currentTable = 2;
			table1.style.display = "none";
			table2.style.display = "contents";
			table3.style.display = "none";
	} else if (tochange == 3){
			currentTable = 3;
			table1.style.display = "none";
			table2.style.display = "none";
			table3.style.display = "contents";
	} 

}

function launchIdSetting(id){
	localStorage.setItem("lId",id);
	console.log(id);
	launchId = id;
}

function updateElement(eID, eInput, Type){
	if(Type==="image"){
		updateE = document.getElementById(eID);
		updateE.src=eInput;
		console.log("Image Updated");
	} else if (Type==="style"){
		updateE = document.getElementById(eID);
		updateE.style += eInput;
	} else {
		updateE = document.getElementById(eID);
		updateE.innerHTML = eInput;
	}
}

function updateImage(eID, SizeH, SizeW){
	updateE = document.getElementById(eID);
	updateE.style = "";
	updateE.style += "width:" + SizeW + "px;";
	updateE.style += "height" + SizeW + "px;";
	
	console.log(updateE.style.width + " " + updateE.style.height);
}

function getAllLaunches(){
	loadJSON();
	var table = document.getElementById("myTable1");
	var header = table.createTHead();

	hitcount = 0;
	
	table.innerHTML = " ";
	
	for(i = 0; i < toTest.length; i++){
		var row = table.insertRow(0);
		
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		var cell7 = row.insertCell(6);
		
		cell1.innerHTML = "<div class='tableElement'>" + toTest[i].id + "</div>";
		cell2.innerHTML = "<div class='tableElement'>" + toTest[i].title + "</div>";
		cell3.innerHTML = "<div class='tableElement'>" + toTest[i].description + "</div>";
		cell4.innerHTML = "<div class='tableElement'>" + toTest[i].cost + "</div>";
		cell5.innerHTML = "<div class='tableElement'>" + toTest[i].location + "</div>";
		cell6.innerHTML = "<a class='btn btn-default' onclick='launchIdSetting(" + toTest[i].id + ")' href='launchInformation.html?" + toTest[i].id + "'> More Information </a>";
		cell7.innerHTML = "<img src='" + toTest[i].imagelink + "' class='smallImage'></img>"
	}
}