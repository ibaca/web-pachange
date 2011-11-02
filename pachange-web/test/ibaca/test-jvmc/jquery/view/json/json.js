steal('jquery/view').then(function($){
        
    $.View.register({
        suffix: "json",
        renderer: function(id, text){
            return function(data){return $.parseJSON(text)};
        },
        script: function(id, text){
            return new Function("obj","return "+text+";");
        }
    });
});
