// load('pachange/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("pachange/pachange.html","pachange/out")
});
