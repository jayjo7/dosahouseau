Template.aboutUs.helpers({

		aboutUs: function()
	{

		return Content.find({$and : [{Key: "AboutUs"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},

});