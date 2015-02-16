Template.cart.helpers({

	currency: function(num)
    	{
        	return '$' + Number(num).toFixed(2);
    	},

    sessionId:function()
    {
    	console.log("sessionId: " +  Session.get('appUUID'))
    	return Session.get('appUUID');
    	//return Meteor.call('getUUID');

    	//console.log("sessionId: " +  Meteor.call('getSessionId'));
    	//return Meteor.connection._lastSessionId;
    }	,

    shopCart: function()
    {
    	   sessid = Session.get('appUUID');
             
           console.log("shopCart:sessid =  " +sessid);
           // return  CartItems.find({session:sessid})

		    //console.log("In Cart Temlate");

		    var shopCart = [];
		   // var sessid = Meteor.default_connection._lastSessionId;
		    var cartItems = CartItems.find({session: sessid});
		    shopCart.itemCount = cartItems.count();
		    var total = 0;

		    cartItems.forEach(function(cartItem){
		        var item = _.extend(cartItem,{});

		        cartItem.price = (Number(cartItem.Charge) * cartItem.qty);
		        total += cartItem.price;
		        shopCart.push(cartItem);
		    });
		    shopCart.subtotal = total;
		    shopCart.tax = shopCart.subtotal * .092;

		    shopCart.total = shopCart.subtotal + shopCart.tax;

		    for(key in shopCart)
		    {
		    	console.log(key + " = " + shopCart[key]) ;
		    }


		    return shopCart;

          
       

    }


});



Template.cart.events({

	'click .removeShadow':function (evt,tmpl)
    {
    	//evt.preventDefault();
    	var $L = 1200,
		$menu_navigation = $('#main-nav'),
		$cart_trigger = $('#cd-cart-trigger'),
		$hamburger_icon = $('#cd-hamburger-menu'),
		$lateral_cart = $('#cd-cart'),
		$shadow_layer = $('#cd-shadow-layer');
		$body = $('body');


		$shadow_layer.removeClass('is-visible');
		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $lateral_cart.hasClass('speed-in') ) {
			$lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$menu_navigation.removeClass('speed-in');
		} else {
			$menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$lateral_cart.removeClass('speed-in');
		}
    }

});