$(document).ready(function(){
	var dbName=window.openDatabase("smartPicDB",1.0,"smartPicDB",5242880);
	var imgSrc="";
	//Function Declarations
	function openCamera(){
	//Opens Device Camera App	
		navigator.camera.getPicture(tookPic, cancelCam, { quality: 50,
    	destinationType: Camera.DestinationType.FILE_URI });
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

	function gridFormer(transaction,results){
		//Displays the pictures in an Gridview

		for(var i=0;i<results.rows.length;i++){
			var row=results.rows.item(i);			
			if (i%2==0) imgSrc+='<div class="ui-block-a"><div class="thumbnail"><img src="'+row.picPath+'" /></div></div>';//$("#imageBanner").append('<div class="ui-block-a"><div class="thumbnail"><img src="'+row.picPath+'" /></div></div>');
			else imgSrc+='<div class="ui-block-b"><div class="thumbnail"><img src="'+row.picPath+'" /></div></div>';//$("#imageBanner").append('<div class="ui-block-b"><div class="thumbnail"><img src="'+row.picPath+'" /></div></div>');
		}		
		$(":mobile-pagecontainer").pagecontainer("change","#grid-page");
		$("#imageBanner").html(imgSrc);
	} 

	function readPaths(){
	//Reads the Saved Picture paths from the DB		
		$("#imageBanner").empty();
		imgSrc=" ";
		dbName.transaction(function(tx){
			tx.executeSql("select * from smartpictable",[],gridFormer);//Reads the FilePaths from DB
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

	function cleanPage(){
		$("#imageBanner").empty();
	}

	
	
	document.addEventListener('deviceready',function(){
	//Device is ready
		dbSetting();
		$("#cambtn").tap(openCamera);//Opens Camera App
		$("#galbtn").tap(readPaths);//Reads all the Image Path 
		//$("#cleanbtn").tap(cleanPage);//Cleans the ImageBanner
	});
	//Loaded all DOM elements
});
