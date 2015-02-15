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

	console.log("In Startup");
}


);