Router.configure({
	layoutTemplate: 'layout',
	  yieldTemplates:{
    'cart':{to:'cart'},
    'foodsToOrder':{to:'foodsToOrder'}
  },

	loadingTemplate: 'loading',
	waitOn: function(){ 
				console.log('Start the required subscribtions..');

		        Meteor.subscribe('cartItems');
		        console.log('done subscribing to cartItems...');

		        Meteor.subscribe('orders');
		       	console.log('done subscribing to orders...');

		        Meteor.subscribe('menu');	       
		        console.log('done subscribing to menu...');

		         Meteor.subscribe('content');	       
		        console.log('done subscribing to content...');

		        return ; 
 }
	
	});
	
//Router.route('/defaultsite', {name: 'homePage'});	

Router.route('/', {name: 'homePage'});

Router.route('/orderFood', 
				{layoutTemplate: 'layoutOrder',
				name: 'orderFood'});
Router.route('/orderConfirmation/:UniqueId', 
				{layoutTemplate:'layoutOrderCOnfirmation',
					name: 'orderConfirmation',
				 data: function(){ 
				 	Meteor.subscribe('ordereditems', this.params.UniqueId);
				 	return {UniqueId: this.params.UniqueId}

				}});


Router.route('/order/:name', 
				{ data : function(){
					console.log("selectedCategory =" + this.params.name);
					if (this.params.name)
						Session.set('selectedCategory', this.params.name);
					else	
						Session.set('selectedCategory', 'All');
				},
					layoutTemplate: 'layoutOrder',
				name: 'order'});

Router.route('/syncSheet', {where:'server'})
.put(function(){

	var request = this.request;
	var response = this.response;

	for(key in request)
	{
		console.log("syncSheet: " + key + " = " + request[key]);
	}


	for(key in response)
	{
		console.log("syncSheet: " + key + " = " + response[key]);
	}

	this.response.end('Hello from the server\n');

})

	
	
	


