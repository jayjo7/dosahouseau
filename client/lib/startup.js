Meteor.startup(function() {
		var $MQ= 1200,
		$navigation = $('#main-nav')

   $('html').attr('class', 'no-js');

   	if ( $(window).width() >= $MQ ) {
		$navigation.detach();
		$navigation.appendTo('header');
	} else {
		$navigation.detach();
		$navigation.insertAfter('header');
	}

	Meteor.call('getUUID', function(error, result){
    	console.log("UUID for this session: " +  result);
    	Session.set('appUUID', result);

    	});
	console.log("In Startup");
}


);