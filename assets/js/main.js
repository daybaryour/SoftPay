$(function() {

    $('#side-menu').metisMenu();

});

function get_invoice_total() {

}

 function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
 }

 function update_total_price() {
 	var sum = 0;
	$("#invoice-items-row #item-price").each(function() {
	    var val = $.trim( $(this).text().replace(/,/g,"") );
	    if(val) {
	    	val = parseFloat( val.replace( /^\₦/, "" ) );
	    	sum += !isNaN( val ) ? val : 0;

	    }
	});
	$("#total-price").html("₦"+commaSeparateNumber(sum));
 }

$(document).ready(function() {
    //$('#dataTables-example').DataTable();
    $("#select-product").select2();
    $(document).on("click","#add-new-item", function(event) {
    	var invoice = $("#invoice-items-row").clone().removeClass("hide");
    	$("#item-form").append(invoice);
    	event.preventDefault();
    });

    $(document).on("input", "#item-rate", function(event) {
    	var rate = $(this).val();
    	if($.isNumeric(rate) != true) {rate = 0}
    	var qty = $(this).parents("#invoice-items-row").find("#item-qty").val();

    	var price = commaSeparateNumber(rate * qty);

    	$(this).parents("#invoice-items-row").find("#item-price").html("₦"+price);
    	update_total_price();
    });

    $(document).on("input", "#item-qty", function(event) {
    	var qty = $(this).val();
    	var rate = $(this).parents("#invoice-items-row").find("#item-rate").val();

    	var price = commaSeparateNumber(rate * qty);
    	$(this).parents("#invoice-items-row").find("#item-price").html("₦"+price);
    	update_total_price();
    });

    $(document).on("click", "#delete-invoice-item", function(event) {
    	$(this).parents("#invoice-items-row").addClass("hide").attr("id","");
    	update_total_price();
    })
    
});