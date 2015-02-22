Meteor.startup(function() {
 	var $MQ= 1200,
	 	$navigation = $('#main-nav')

	 	$('html').attr('class', 'no-js');

	 	$('body').attr('class', 'body');

	 	if ( $(window).width() >= $MQ ) {
	 	$navigation.detach();
	 	$navigation.appendTo('header');
 	} 
 else 
 	{
 		$navigation.detach();
 		$navigation.insertAfter('header');
 	}


var appUUID = Session.get('appUUID');
if(appUUID)
{

console.log("appUUID from the session = " + appUUID);

}
else
{

 Meteor.call('getUUID', function(error, result){
 Session.setTemp('appUUID', result);
 console.log("UUID for this session: " + result);


 	});
}

//var appUUID = Meteor.call('getUUID')

//console.log("addig UUID for this session: " + appUUID);
//Session.setPersistent('appUUID', result);


 	console.log("In Startup");
	}


);