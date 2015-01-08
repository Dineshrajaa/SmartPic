$(document).ready(function(){
	var dbName=window.openDatabase("smartPicDB",1.0,"smartPicDB",5242880);
	//Function Declarations
	function openCamera(){
	//Opens Device Camera App
		navigator.camera.getPicture(tookPic, cancelCam, { quality: 50,
    	destinationType: Camera.DestinationType.NATIVE_URI });
	}

	function tookPic(imageURI){
	//Called when shoted an picture using Camera	
	dbName.transaction(function(tx){
		//Insert the picture path in DB
		tx.executeSql("insert into smartpictable(picPath) values(?)",[imageURI]);
		
	});
	}

	function dbSetting(){
		if (window.openDatabase) {
			//Checks whether WebSQL is supported			
			dbName.transaction(function(tx){
				//Create a table to store file paths
				tx.executeSql("create table if not exists smartpictable(picId integer primary key asc,picPath text)");
				
			});
		}
		else{
			alert("Your device is not having WebSQL support")
		}
	}

	function cancelCam(message){
	//Called when Camera App Closed
	alert('Failed because: ' + message);
	}
	document.addEventListener('deviceready',function(){
	//Device is ready
	dbSetting();
	$("#cambtn").tap(openCamera);
	});
	//Loaded all DOM elements
});