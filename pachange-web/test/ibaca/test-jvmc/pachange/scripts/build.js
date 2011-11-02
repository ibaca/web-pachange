//steal/js pachange/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build').then('steal/build/scripts','steal/build/styles',function(){
	steal.build('pachange/scripts/build.html',{to: 'pachange'});
});
