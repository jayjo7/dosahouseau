Template.footer.helpers({

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
});