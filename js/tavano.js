$(document).ready(function() {
	hamburger = 1;
  	$('.navbar-toggle').click(function () {
	  	if ((hamburger == 1) && ($(document).scrollTop() < 1)) {
	  		//alert(hamburger)
	    	$('nav').addClass("sticky");
	    	$('#top-logo').attr("src","assets/images/logo_green.png")
	    	hamburger = 2;
	    } else if ( (hamburger != 1) && ($(document).scrollTop() < 1) ) {
	    	//alert(hamburger)
	    	$('nav').removeClass("sticky");
	    	$('#top-logo').attr("src","assets/images/logo_white.png")
	    	hamburger = 1;
	    } else {
	    	//alert ("else");
	    	hamburger = 1;
	    	//alert(hamburger);
	    }
	});
    $(".fancybox").fancybox();
});
$(window).scroll(function() {
	if ($(this).scrollTop() > 1){  
		//alert(hamburger);
    	$('nav').addClass("sticky");
    	$('#top-logo').attr("src","assets/images/logo_green.png")
  	}  else if ( ($(this).scrollTop() < 1) && ($('#navbar').attr('aria-expanded') == 'true' ) ) {
		//$('nav').removeClass("sticky");
		//alert("ah!")
    	$('#top-logo').attr("src","assets/images/logo_green.png")
  	}  else {
  		//alert("scroll else");
    	$('nav').removeClass("sticky");
    	//$('nav').addClass("sticky");
    	$('#top-logo').attr("src","assets/images/logo_white.png")
  	}
});