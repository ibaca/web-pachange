steal('jquery/controller',
    'jquery/view/ejs',
    'jquery/controller/view',
    function($){

        $.Controller("Pachange.Topbar",
        /* @static */
        {},
        /* @prototype */
        {
            init: function(){
                this.element.html(this.view());
            }
        }
        )

    });