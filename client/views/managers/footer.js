Template.footer.helpers({

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