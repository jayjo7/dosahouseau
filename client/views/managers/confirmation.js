Template.confirmation.helpers({
	isReady: function(uniqueId)
    {
        console.log('getStatusNUmber:uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        if('ready' === order.Status)
        	return true;
        else
        	return false;

     },

     	isDelivered: function(uniqueId)
    {
        console.log('getStatusNUmber:uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        if('delivered' === order.Status)
        	return true;
        else
        	return false;

     },

          	isInProcess: function(uniqueId)
    {
        console.log('getStatusNUmber:uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        if('inProcess' === order.Status)
        	return true;
        else
        	return false;

     },

     isInKitchen: function(uniqueId)
    {
        console.log('getStatusNUmber:uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        if('inProcess' === order.Status || 'delivered' === order.Status || 'ready' === order.Status)
        	return true;
        else
        	return false;

     },

     isSaleComplete: function(uniqueId)
    {
        console.log('getStatusNUmber:uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        if( 'delivered' === order.Status || 'ready' === order.Status)
        	return true;
        else
        	return false;

     },

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

     message: function(uniqueId)
	{
		console.log('message:uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        var messageKey='message_confirmation';
        if('ready' === order.Status)

        	messageKey = 'message_ready';
        	
        else
		if('delivered' === order.Status)

			messageKey = 'message_delivered';


		var confirmation = Settings.findOne({$and : [{Key: messageKey}, {Value : {"$exists" : true, "$ne" : ""}}]});

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

		return Settings.findOne({$and : [{Key: "address"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

		phoneNumber:function(){
		
		return Settings.findOne({$and : [{Key: "phone_number"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	}
	,
			faxNumber:function(){
		
		return Settings.findOne({$and : [{Key: "fax_number"}, {Value : {"$exists" : true, "$ne" : ""}}]});

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