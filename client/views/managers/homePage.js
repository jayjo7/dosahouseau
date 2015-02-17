Template.homePage.helpers({

	categoryMenu: function()
	{

		return Settings.find({$and : [{Key: "CategoryMenu"}, {Value : {"$exists" : true, "$ne" : ""}}]});

	},
	menu:function(categoryMenu)
	{

		return Menu.find({$and : [{Category: categoryMenu}, {Name : {"$exists" : true, "$ne" : ""}}]});

	},

		isMenuAvailable:function(categoryMenu)
	{

		var menuCount = Menu.find({$and : [{Category: categoryMenu}, {Name : {"$exists" : true, "$ne" : ""}}]}).count();
		if(menuCount > 0)
			return true;
		else
			return false;
	},

	isItemAvailable:function(fontLine)
	{

		if('line-through' === fontLine)
			return  false;
		else
			return true;
	},

	    soldOut:function(fontLine)
    {
    	if('line-through' === fontLine)
    		return 'soldout';
    	else
    		return '';
    },
        currency: function(num)
    {
        return '$' + Number(num).toFixed(2);
    },

    idOddNumberItems: function(categoryMenu)
    {
    			var menuCount = Menu.find({$and : [{Category: categoryMenu}, {Name : {"$exists" : true, "$ne" : ""}}]}).count();
    			console.log("menuCount = " + menuCount);
    			if(menuCount === 1)
    			{
    				return true;
    			}
    			else if(menuCount > 1)
    			{
    				console.log("menuCount %2 = " + menuCount % 2 );
    				if(menuCount %2 === 1)
    					return true;
    				else
    					return false;
    			}

    }

});

Template.homePage.events({
    'click .addcart': function(evt,tmpl)
    {
        var currentTarget = evt.currentTarget
        console.log("currentTarget" + currentTarget);
        console.log("tmpl" + tmpl);
        console.log("this.UniqueId " + this.UniqueId );
        var product = this.UniqueId ;
        var sessid = Session.get('appUUID');
        console.log("product = " + product );
        console.log("sessid = " + sessid );
        Meteor.call('addToCart', 1 ,product, sessid, this.Name, this.Category, this.Charge);
        evt.currentTarget.className = " fa fa-check btn btn-success";
        evt.currentTarget.title='Added'
    }


});