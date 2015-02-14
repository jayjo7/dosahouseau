Meteor.publish('menu', function(){
	return Menu.find();
	}
	);	
	
Meteor.publish('cartItems', function(sessid){

	console.log("In Publish: sessid " + sessid );

	return  CartItems.find({session: sessid });

	}
	);	


Meteor.publish('ordereditems', function(UniqueId){

	console.log("In Publish (OrderedItems): UniqueId " + UniqueId );
 
	return  OrderedItems.find({UniqueId: UniqueId });

	}
	);	
	
	
	Meteor.publish('orders', function(){
	console.log("Count Order = " + Orders.find().count());
	return Orders.find();
	}
	);	

   Meteor.publish('content', function(){
	console.log("Content = " + Content.find().count());
	return Content.find();
	}
	);	
	


