steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'pachange/models' )
	.then('./views/init.ejs', function($){

/**
 * @class pachange.Recipe.Create
 * @parent index
 * @inherits jQuery.Controller
 * Creates recipes
 */
$.Controller('Pachange.Recipe.Create',
/** @Prototype */
{
	init : function(){
		this.element.html(this.view());
	},
	submit : function(el, ev){
		ev.preventDefault();
		this.element.find('[type=submit]').val('Creating...')
		new Pachange.Models.Recipe(el.formParams()).save(this.callback('saved'));
	},
	saved : function(){
		this.element.find('[type=submit]').val('Create');
		this.element[0].reset()
	}
})

});