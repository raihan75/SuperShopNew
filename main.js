var products=$("section[data-model='products'] [data-model='product-card']");
products.each(function (key, item){
	
	var product=$(item);
	
	//acquire_fields
	var field_base_price=product.find("[data-field='item-base-price']");
	var field_base_quantity=product.find("[data-field='item-base-quantity']");
	var field_total_price=product.find("[data-field='item-total-price']");
	var proceed=product.find("button[data-command='item-add']");
	
	
	//acquire_pricing_reference
	var pricing=product.find('.inner').attr('data-pricing');
	var pricing_step=pricing.split('|');
	var pricing_reference=new Array();
	pricing_step.forEach(function(item,key){
		pricing_reference[key]=item.split(':');
		if(key==0){
			field_base_price.val(pricing_reference[key][1]);
			field_total_price.val(pricing_reference[key][1]);
		}
	});
	//console.log(pricing_reference);
	
	
	//events
	field_base_quantity.on('focus',function(){
		$(this).select();
	});
	field_base_quantity.on('keyup change click',function(evt){

			var base_price;
			var base_quantity=parseInt((evt.target.value>0)?evt.target.value:1);
			var total_price;
			pricing_reference.forEach(function(item,key){
				if(base_quantity>=pricing_reference[key][0]){
					base_price=pricing_reference[key][1];
				}
			});
			total_price=(base_price*base_quantity).toFixed(2);

			field_base_price.val(base_price);
			field_base_quantity.val(base_quantity);
			field_total_price.val(total_price);

	});
	
});


//TOUCHSPIN
function interfaceTouchSpin(){
$("input[data-interface='TouchSpin']").each(function (key, item){
	var input=$(item);
	var input_id=input.attr('id');

		input.TouchSpin({
			min: $(this).data('min') ? $(this).data('min') : 0,
			max: $(this).data('max') ? $(this).data('max') : 10000,
			step: $(this).data('step') ? $(this).data('step') : 0.1,
			decimals: $(this).data('decimals') ? $(this).data('decimals') : 0,
			boostat: $(this).data('boostat') ? $(this).data('boostat') : 3,
			maxboostedstep: $(this).data('maxboostedstep') ? $(this).data('maxboostedstep') : 10,
			verticalbuttons: $(this).data('vertical') ? $(this).data('vertical') : true,
			verticalup: '<i class="fa fa-plus"></i>',
			verticaldown: '<i class="fa fa-minus"></i>',
			buttondown_class: $(this).data('btn-before') ? 'btn btn-' + $(this).data('btn-before') : 'btn btn-default',
			buttonup_class: $(this).data('btn-after') ? 'btn btn-' + $(this).data('btn-after') : 'btn btn-default',
			prefix: $(this).data('prefix') ? $(this).data('prefix') :'',
			postfix: $(this).data('postfix') ? $(this).data('postfix') :''
		});


});//each
}//interfaceTouchSpin
//TOUCHSPIN


$(function(){
		interfaceTouchSpin();
});

