Template.aboutUs.helpers({

		aboutUs: function()
	{

		return Content.find({$and : [{Key: "AboutUs"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

	address:function(){

		return Content.find({$and : [{Key: "Address"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

		phoneNumber:function(){
		
		return Content.find({$and : [{Key: "PhoneNumber"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	}
	,
			faxNumber:function(){
		
		return Content.find({$and : [{Key: "FaxNumber"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	}
});