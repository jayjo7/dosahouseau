Template.confirmation.helpers({

    order: function(uniqueId)
    {
        console.log('uniqueId = ' + uniqueId);

        return Orders.find({UniqueId:uniqueId});

     },

     customerName: function(uniqueId)
    {
        console.log('uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        return order.CustomerName;

     },

     confirmation: function()
	{

		return Content.find({$and : [{Key: "Confirmation"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

		address:function(){

		return Content.findOne({$and : [{Key: "Address"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

		phoneNumber:function(){
		
		return Content.findOne({$and : [{Key: "PhoneNumber"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	}
	,
			faxNumber:function(){
		
		return Content.findOne({$and : [{Key: "FaxNumber"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	}
	,

     orderNumber: function(uniqueId)
    {
        console.log('uniqueId = ' + uniqueId);
        var order = Orders.findOne({UniqueId:uniqueId});
        return order.OrderNumber;

     }

});