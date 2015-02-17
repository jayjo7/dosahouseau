Template.confirmation.helpers({

    order: function(uniqueId)
    {
        console.log('uniqueId = ' + uniqueId);

        return Orders.findOne({UniqueId:uniqueId});

     },

     customerName: function(uniqueId)
    {
        console.log('uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        return order.CustomerName;

     },

     confirmation: function()
	{

		var confirmation = Settings.findOne({$and : [{Key: "Confirmation"}, {Value : {"$exists" : true, "$ne" : ""}}]});

		var value = confirmation['Value'];
		console.log(' confirmation value = ' + value);

		var confirmationArray = value.split('\n\n' );

		for(key in confirmationArray)
		{
		console.log(key + " = " + confirmationArray[key]);
		}

		return confirmationArray;

	},

		address:function(){

		return Settings.findOne({$and : [{Key: "Address"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

		phoneNumber:function(){
		
		return Settings.findOne({$and : [{Key: "PhoneNumber"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	}
	,
			faxNumber:function(){
		
		return Settings.findOne({$and : [{Key: "FaxNumber"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	}
	,

     orderNumber: function(uniqueId)
    {
        console.log('uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        return order.OrderNumber;

     },

         orderedCart: function(uniqueId)
    {
    	  
             
           console.log("orderedCart:uniqueId =  " +uniqueId);


		    var orderedCart = [];
		    var cartItems = OrderedItems.find({UniqueId: uniqueId});
		    orderedCart.itemCount = cartItems.count();
		    var total = 0;

		    cartItems.forEach(function(cartItem){
		        var item = _.extend(cartItem,{});

		        cartItem.price = (Number(cartItem.Charge) * cartItem.qty);
		        total += cartItem.price;
		        orderedCart.push(cartItem);
		    });
		    orderedCart.subtotal = total;
		    orderedCart.tax = orderedCart.subtotal * .092;

		    orderedCart.total = orderedCart.subtotal + orderedCart.tax;

		    for(key in orderedCart)
		    {
		    	console.log(key + " = " + orderedCart[key]) ;
		    }

		    Session.set('orderedSubTotal', orderedCart['subtotal']);
		   	Session.set('orderedTax', orderedCart['tax']);		    
		   	Session.set('orderedTotal', orderedCart['total']);


		    return orderedCart;

          
       

    },

    getSubTotal:function()

	{
		return '$'+Number(Session.get('orderedSubTotal')).toFixed(2);
	},
    getTax:function()

	{
		return '$'+Number(Session.get('orderedTax')).toFixed(2);
	},
	    getTotal:function()

	{
		return '$'+Number(Session.get('orderedTotal')).toFixed(2);
	},
    	currency: function(num)
    	{
        	return '$' + Number(num).toFixed(2);
    	}



});