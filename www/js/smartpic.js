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
		//Saves the picture path in DB
		tx.executeSql("insert into smartpictable(picPath) values(?)",[imageURI]);
		
	});
	}

	function cancelCam(message){
	//Called when Camera App Closed
		alert('Failed because: ' + message);
	}

	function readPaths(){
	//Reads the Saved Picture paths from the DB
		dbName.transaction(function(tx){
			tx.executeSql("select * from smartpictable",[],gridFormer);
		});
	}

	function gridFormer(transaction,results){
		//Displays the pictures in an Gridview
		var imagePad=$("#imageBanner");

		for(int i=0;i<results.rows.length;i++){
			var row=results.rows.item(i);
			if (i%2==0) imagePad.append("<div class='ui-block-a thumbnail'><img src='row.picPath' id='row.picId'></div>");
			else imagePad.append("<div class='ui-block-a thumbnail'><img src='row.picPath' id='row.picId'></div>");
		}
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

	
	
	document.addEventListener('deviceready',function(){
	//Device is ready
		dbSetting();
		$("#cambtn").tap(openCamera);//Opens Camera App
	});
	//Loaded all DOM elements
});