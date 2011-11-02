steal('jquery/model', function(){

/**
 * @class Pachange.Models.Recipe
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend recipe services.  
 */
$.Model('Pachange.Models.Recipe',
/* @Static */
{
	findAll: "/recipes.json",
  	findOne : "/recipes/{id}.json", 
  	create : "/recipes.json",
 	update : "/recipes/{id}.json",
  	destroy : "/recipes/{id}.json"
},
/* @Prototype */
{});

})