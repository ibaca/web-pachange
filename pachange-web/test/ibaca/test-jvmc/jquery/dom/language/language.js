steal('jquery','jquery/dom/cookie',function( $ ) {
    
    function currentLanguage() {
        var lang = undefined;
        // Cookie?
        lang = jQuery.cookie('language');
        if (jQuery.type(lang) === 'string') return lang;
        // Browser?
        lang = navigator.language? navigator.language : navigator.userLanguage;
        if (jQuery.type(lang) === 'string') return lang;
        // Default english
        return lang = 'en';
    }
    
    $.language = function(lang) {
        if (typeof lang == 'undefined') {
            lang = currentLanguage();
        }
        lang = lang.substr(0,2).toLowerCase();
        // Check valid language
        if (jQuery.inArray(lang,['es','en','ge']) == -1) {
            lang = 'en';
        }
        // Save current language
        jQuery.cookie('language',lang);
        return lang;
    }
}
);
