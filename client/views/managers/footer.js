Template.footer.helpers({

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
});