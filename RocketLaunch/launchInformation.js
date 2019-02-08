var toTest = [];
var launchesExtra = [];

var isAdmin=false;

var launchId = 0;

function loadJSON(){
	var request = new XMLHttpRequest();
	var request2 = new XMLHttpRequest();
	
	request.open('GET', 'http://192.168.1.114:8090/api/launches');
	
	request.setRequestHeader('Content-Type', 'application/json');     
	request.setRequestHeader('Access-Control-Allow-Origin', '*');
	
	request.responseType = 'json';	
	
	request.send();

	request.onload = function(){
	toTest = request.response;
	loadInformation();
	}
}

function loadInformation(){
	launchId = window.location.href.split("?")[1];
	console.log(launchId);
	lImage = document.getElementById('launchImage');
	lTitle = document.getElementById('launchTitle');
	lDescription = document.getElementById('launchDescription');
	lCost = document.getElementById('launchCost');
	lLocation = document.getElementById('launchLocation');
	lCompany = document.getElementById('launchCompany');
	lRocketLoad = document.getElementById('launchLoad');
	lRocketType = document.getElementById('launchRocketType');
	lTime = document.getElementById('launchTime');
	
	for(i=0; i < toTest.length; i++){
		if(toTest[i].id == launchId){
			lTitle.innerHTML = toTest[i].title;
			lDescription.innerHTML = toTest[i].description;
			lImage.src = toTest[i].imagelink;
			lCost.innerHTML = toTest[i].cost;
			lLocation.innerHTML = toTest[i].location;
			lCompany.innerHTML = toTest[i].company;
			lRocketLoad.innerHTML = toTest[i].rocketload;
			lRocketType.innerHTML = toTest[i].rockettype;
			lTime.innerHTML = toTest[i].time;
		}
	}
		
		
	
			
	
}
