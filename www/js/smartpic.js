$(document).ready(function(){
	var dbName;
	//Function Declarations
	function openCamera(){
	//Opens Device Camera App
		navigator.camera.getPicture(tookPic, cancelCam, { quality: 50,
    	destinationType: Camera.DestinationType.NATIVE_URI });
	}

	function tookPic(imageURI){
	//Called when shoted an picture using Camera
	alert(imageURI);
	}

	function dbSetting(){
		if (window.openDatabase) {
			//Checks whether WebSQL is supported
			dbName=window.openDatabase("smartPicDB",1.0,"smartPicDB",5242880);//Open DB
			dbName.transaction(function(tx){
				//Create a table to store file paths
				tx.executeSql("create table if not exists smartpictable(picId integer primary key asc,picPath text)");
			});
		}
		else{
			alert("Your device not having WebSQL support")
		}
	}

	function cancelCam(message){
	//Called when Camera App Closed
	alert('Failed because: ' + message);
	}
	document.addEventListener('deviceready',function(){
	//Device is ready
	$("#cambtn").tap(openCamera);
	});
	//Loaded all DOM elements
});