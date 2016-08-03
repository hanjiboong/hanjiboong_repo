$(document).ready(function() {


$(".top-menu .col-xs-2").click(function() {
	$(this).parent().children(".col-xs-2").removeClass("top-menu-active");
	$(this).addClass("top-menu-active");

	$(".contents-box").hide();
	$($(this).children("a").attr("href")).show();

});

});