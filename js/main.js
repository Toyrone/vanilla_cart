var app = {
	cartCtrl: function() {
		//empty cart...
		var cart = [];
		
		//Object constructor to create items...
		function Item(name, price, count, unit, img) {
			this.name = name;
			this.price = price;
			this.count = count;
			this.unit = unit;
			this.img = img;
		}

		// Function to add a new item to cart
		function addItemToCart(name, price, count, unit,img) {
			for(var i in cart) {
				if (cart[i].name === name) {
					cart[i].count += count;
					return
				}
				saveOurCart();
			}
		var item = new Item(name, price, count, unit, img);
		cart.unshift(item);
		//console.log(cart);
		}
		/*addItemToCart("bag", 55, 1, "kg", "bag.png");
		addItemToCart("bag", 55, 1, "kg", "bag.png");
		addItemToCart("bag", 2, 1, "kg");
		addItemToCart("bag", 2, 1, "kg");
		addItemToCart("bag", 2, 1, "kg");*/
		//removeAnItemFromCart("bag");	
		

		 //function to remove an item from cart
	    function removeAnItemFromCart(name){
	    	for(var i in cart) {
	     	 	if(cart[i].name === name){
	     	 		cart[i].count--;
	     	 		if (cart[i].count === 0) {
	     	 			cart.splice(i, 1)
	     	 		}	
	        	  	break;
	        	}
	      	}
	    //  console.log(cart);
		}


		//function to remove all of an item from cart 
		function removeItemFromCartAll(name) {
			for(var i in cart) {
				if (cart[i].name === name) {
					cart.splice(i,1);
					break;
				}
			}
			saveOurCart();
			//console.log(cart);
		}

		//Function to clear all items from cart
		function clearAllItemsFromCart() {
			cart = [];
			saveOurCart();
			//console.log(cart);
		}


		//Function to count number of items
		function totalCountOfItems() {
			var total = 0;
			for (var i in cart) {
				total += cart[i].count;
			}
			return total;
		}
		
		//function to display the total amount
		function totalAmount() {
			var amount = 0;
			for (var i in cart) {
				amount += cart[i].price * cart[i].count;
			}
			return amount;
		}

		function deliveryFee(fee) {
			return fee;
		}
		function serviceCharge(percent) {
			var service = 0;
			service = (percent/100) * totalAmount();
			return service;
		}

		//function to display the grand total price
		function grandTotal(fee, amount) {
			var grand = 0;
			grand = (totalAmount() + deliveryFee(fee) + serviceCharge(percent));
			return grand;
		}

		//Function to creat a copy of cart items
		function duplicateCart() {
			var cartCopy = [];

			for (var i in cart) {
				var item = cart[i];
				var itemCopy = {};
				for (var p in item) {
					itemCopy[p] = item[p];
				}
				cartCopy.push(itemCopy);
			}
			return cartCopy;
		}

		function displayCartChanges() {
			var cartArray = duplicateCart();
			var output = '';

			for (var i in cartArray) {
				output += `<li>${cartArray[i].name} ${cartArray[i].price} <span class="remove" data-action = ${cartArray[i].name}>x</span></li>`;
				//output += "<li>" + cartArray[i].name + "</li>"
			}
			var cartItems = document.getElementById('cartItems');
			var counter = document.getElementById('count');
			cartItems.innerHTML = output;
			counter.innerHTML = totalCountOfItems();

		}

		function saveOurCart() {
			localStorage.setItem("switchCart", JSON.stringify(cart));
		}
		function loadOurCart() {
			cart = JSON.parse(localStorage.getItem("switchCart"));
		}
		//addItemToCart("Shoe", 50, 1, "kg")
		//totalCountOfItems();
		
		var products = Array.from(document.getElementById('products').querySelectorAll('.card'));
		var removes = Array.from(document.querySelectorAll('.remove'));
		var clearCart = document.querySelector('#clear_cart');
		//console.log(products);

		function productHandler() {
			//console.log(this);
	    	var name = this.getAttribute('data-name');
		    var price = this.getAttribute('data-price');
	        var unit = this.getAttribute('data-unit');
	        var img = this.getAttribute('data-img');
	      
	        addItemToCart(name, price, 1, unit, img);
	        displayCartChanges();
			
		}

		function removeHandler() {
			var name = this.getAttribute('data-action');
			removeItemFromCartAll(name);
		}

		products.forEach(function(product){
 			product.addEventListener('click', productHandler);
		});


		removes.forEach(function(remove) {
			remove.addEventListener('click', removeHandler)
		});

		document.addEventListener('click', function(e) {
			if (e.target.className !== 'remove') {
				return
			}
			e.target.parentElement.remove();
			var name = e.target.getAttribute('data-action');
			//console.log(name);
			removeItemFromCartAll(name);

			displayCartChanges();
		})


		clearCart.addEventListener('click', function() {
			clearAllItemsFromCart();
			displayCartChanges();
		});
		loadOurCart();
		displayCartChanges();
	}	
};