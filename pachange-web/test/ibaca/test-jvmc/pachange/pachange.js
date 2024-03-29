steal(
    'steal/less'                // CSS Less Engine
).then(
    '../bootstrap/lib/bootstrap.less'
).then(
    'jquery'
).then(
    './pachange.css', 		// application CSS file
    './models/models.js',	// steals all your models
    './fixtures/fixtures.js',	// sets up fixtures for your models
    'pachange/recipe/create',
    'pachange/recipe/list',
    'pachange/topbar',
    'pachange/locales',
    'jquery/dom/language',
    'jquery/event/hashchange',
    'jquery/view',
    'jquery/view/ejs',
    'jquery/jsperanto',
    'steal/html',
function($){ var lang = $.language();
    $.getJSON('locales/'+lang+'.json').complete(function(dictionary){
    
    // Initialize jSperanto I18n plugin
    $.jsperanto.init(function(){},{
        lang: lang, 
        dictionary: dictionary
    });

    // Initialize topbar
    $('.topbar').pachange_topbar();

    $.Controller('Ajaxy',{
        init : function(){
            this.updateContent();
        },
        "{window} hashchange" : function() {
            this.updateContent();
        },
        updateContent : function(){
            var hash = window.location.hash.substr(2),
            url = "fixtures/"+(hash||"home")+".html";

            // postpone reading the html
            steal.html.wait();

            $.get(url, {}, this.callback('replaceContent'),"text");
        },
        replaceContent : function(html) {
            this.element.html(html);

            // indicate the html is ready to be crawled
            steal.html.ready();
        }

    });

    $(".content").ajaxy();
})});