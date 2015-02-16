Template.cart.helpers({

	currency: function(num)
    	{
        	return '$' + Number(num).toFixed(2);
    	},

    shopCart: function()
    {
    	
            console.log("In Cart Temlate");

            var shopCart = [];
            var sessid = Meteor.default_connection._lastSessionId;
            console.log("shopCart:sessid =  " +sessid);
            var cartItems = CartItems.find({session: sessid});
            shopCart.itemCount = cartItems.count();
            var total = 0;

            cartItems.forEach(function(cartitem){
                var item = _.extend(cartitem,{});
                console.log("shopCart:cartitem.product =  " +cartitem.product);
                var product = Menu.findOne({UniqueId:cartitem.product});
                console.log("shopCart:product =  " + product);

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



Template.cart.events({

	'click .removeShadow':function (evt,tmpl)
    {
    	evt.preventDefault();
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