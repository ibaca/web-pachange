//js pachange/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('pachange/pachange.html', {
		markdown : ['pachange']
	});
});