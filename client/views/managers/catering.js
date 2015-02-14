Template.catering.helpers({

		catering: function()
	{

		return Content.find({$and : [{Key: "Catering"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

});