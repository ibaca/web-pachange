steal("funcunit", function(){
	module("pachange test", { 
		setup: function(){
			S.open("//pachange/pachange.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})