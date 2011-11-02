steal( 'jquery/controller',
	   'jquery/view/ejs',
	   'jquery/controller/view',
	   'pachange/models' )
.then( './views/init.ejs', 
       './views/recipe.ejs', 
       function($){

/**
 * @class pachange.Recipe.List
 * @parent index
 * @inherits jQuery.Controller
 * Lists recipes and lets you destroy them.
 */
$.Controller('Pachange.Recipe.List',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view('init',Pachange.Models.Recipe.findAll()) )
	},
	'.destroy click': function( el ){
		if(confirm("Are you sure you want to destroy?")){
			el.closest('.recipe').model().destroy();
		}
	},
	"{Pachange.Models.Recipe} destroyed" : function(Recipe, ev, recipe) {
		recipe.elements(this.element).remove();
	},
	"{Pachange.Models.Recipe} created" : function(Recipe, ev, recipe){
		this.element.append(this.view('init', [recipe]))
	},
	"{Pachange.Models.Recipe} updated" : function(Recipe, ev, recipe){
		recipe.elements(this.element)
		      .html(this.view('recipe', recipe) );
	}
});

});