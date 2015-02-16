Template.homePage.helpers({

	categoryMenu: function()
	{

		return Content.find({$and : [{Key: "CategoryMenu"}, {Value : {"$exists" : true, "$ne" : ""}}]});

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

    },
    shopCart: function()
    {
    	
            console.log("In Cart Temlate");

            var shopCart = [];
            var sessid = Meteor.default_connection._lastSessionId;
            console.log("sessid =  " +sessid);
            var cartItems = CartItems.find({session: sessid});
            shopCart.itemCount = cartItems.count();
            var total = 0;

            cartItems.forEach(function(cartitem){
                var item = _.extend(cartitem,{});
                console.log("cartitem.product =  " +cartitem.product);
                var product = Menu.findOne({UniqueId:cartitem.product});
                console.log("product =  " + product);

                var charge = product.Charge;

                cartitem.productname = product.Name;
                cartitem.price = (Number(charge) * cartitem.qty);
                total += cartitem.price;
                shopCart.push(cartitem);
            });
            shopCart.subtotal = total;
            shopCart.tax = shopCart.subtotal * .092;

            shopCart.total = shopCart.subtotal + shopCart.tax;

            console.log("shopCart = " + shopCart);


            return shopCart;
            
       

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
        var sessid = Meteor.default_connection._lastSessionId;
        console.log("product = " + product );
        console.log("sessid = " + sessid );
        Meteor.call('addToCart', 1 ,product, sessid, this.Name, this.Category, this.Charge);
        evt.currentTarget.className = " fa fa-check btn btn-success";
        evt.currentTarget.title='Added'
    }


});