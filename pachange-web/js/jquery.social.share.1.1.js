/*
 * DC jQuery Social Share Buttons
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){

	//define the new for the plugin ans how to call it
	$.fn.dcSocialShare = function(options) {

		//set default options
		var defaults = {
			classWrapper: 'dc-social-float',
			classContent: 'dc-social-float-content',
			width: 70,
			idWrapper: 'dc-social-float-'+$(this).index(),
			location: 'top', // top, bottom
			align: 'left', // left, right
			offsetLocation: 50,
			offsetAlign: 50,
			center: false,
			centerPx: 0,
			speedFloat: 1500,
			speedContent: 600,
			disableFloat: false,
			tabText: '<img src="images/tab_share.png" alt="Share" />',
			classTab: 'tab',
			classOpen: 'dc-open',
			classClose: 'dc-close',
			classToggle: 'dc-toggle',
			twitterId: '',
			size: 'vertical',
			autoClose: false,
			loadOpen: true,
			tabClose: true,
			easing: 'easeOutQuint',
			buttons: 'twitter,facebook,plusone,linkedin,buzz,digg,stumbleupon'
		};

		//call in the default otions
		var options = $.extend(defaults, options);
		
		//act upon the element that is passed into the design    
		return this.each(function(options){

			var idWrapper = defaults.idWrapper;
			var floatTab = '<div class="'+defaults.classTab+'"><span>'+defaults.tabText+'</span></div>';
			
			$(this).addClass(defaults.classContent).wrap('<div id="'+idWrapper+'" class="'+defaults.classWrapper+' '+defaults.align+'" />');
			
			if(defaults.location == 'bottom'){
				$('#'+idWrapper).addClass(defaults.location).append(floatTab);
			} else {
				$('#'+idWrapper).prepend(floatTab);
			}
			
			//cache vars
			var $floater = $('#'+idWrapper);
			var $tab = $('.'+defaults.classTab,$floater);
			var $content = $('.'+defaults.classContent,$floater);
			var linkOpen = $('.'+defaults.classOpen);
			var linkClose = $('.'+defaults.classClose);
			var linkToggle = $('.'+defaults.classToggle);
			var cssPos = defaults.disableFloat == false ? 'absolute' : 'fixed' ;
			var url = document.URL;
			var encurl = encodeURI(url);
			var size = defaults.size;
			var title = jQuery(this).attr('title');
			var description = $('meta[name=description]').attr("content");
			
			$floater.css({width: defaults.width+'px', position: cssPos, zIndex: 10000});
			
			var h_c = $content.outerHeight(true);
			var h_f = $floater.outerHeight();
			var h_t = $tab.outerHeight();
			
			if(defaults.tabClose == true){
				$content.hide();
			}
			
			floaterSetup($floater);
		
			var start = $('#'+idWrapper).position().top;
			
			if(defaults.disableFloat == false){
				floatObj();
				$(window).scroll(function(){
					floatObj();
				});
			}
			
			if(defaults.loadOpen == true){
				floatOpen();
			}
			
			if(defaults.tabClose == true){
			
				$tab.click(function(e){
					if($floater.hasClass('active')){
						floatClose();
					} else {
						floatOpen();
					}
					e.preventDefault();
				});
				
				$(linkOpen).click(function(e){
					if($floater.not('active')){
						floatOpen();
					}
					e.preventDefault();
				});
					
				$(linkClose).click(function(e){
					if($floater.hasClass('active')){
						floatClose();
					}
					e.preventDefault();
				});
					
				$(linkToggle).click(function(e){
					if($floater.hasClass('active')){
						floatClose();
					} else {
						floatOpen();
					}
					e.preventDefault();
				});
				
			// Auto-close
			if(defaults.autoClose == true){
				$('body').mouseup(function(e){
					if($floater.hasClass('active')){
						if(!$(e.target).parents('#'+defaults.idWrapper+'.'+defaults.classWrapper).length){
							floatClose();
						}
					}
				});
			}
			} else {
				// Add active class if tabClose false
				$floater.addClass('active');
			}
			
			function floatOpen(){
			
				$('.'+defaults.classWrapper).css({zIndex: 10000});
				$floater.css({zIndex: 10001});
				var h_fpx = h_c+'px';
				
				if(defaults.location == 'bottom'){
					$content.animate({marginTop: '-'+h_fpx}, defaults.speed).slideDown(defaults.speedContent);
				} else {
					$content.slideDown(defaults.speedContent);
				}
				$floater.addClass('active');
			}
			
			function floatClose(){
				$content.slideUp(defaults.speedContent, function(){
					$floater.removeClass('active');
				});
			}
			
			function floatObj(){
				var scroll = $(document).scrollTop();
				var moveTo = start + scroll;
				var h_b = $('body').height();
				var h_f = $floater.height();
				var h_c = $content.height();
				$floater.stop().animate({top: moveTo}, defaults.speedFloat, defaults.easing);
			}
			
			// Set up positioning
			function floaterSetup(obj){
			
				var location = defaults.location;
				var align = defaults.align;
				var offsetL = defaults.offsetLocation;
				var offsetA = defaults.offsetAlign;
				
				if(location == 'top'){
					$(obj).css({top: offsetL});
				} else {
					$(obj).css({bottom: offsetL});
				}
				
				if(defaults.center == true){
					offsetA = '50%';
				}
				if(align == 'left'){
					$(obj).css({left: offsetA});
					if(defaults.center == true){
						$(obj).css({marginLeft: -defaults.centerPx+'px'});
					}
				} else {
					$(obj).css({right: offsetA});
					if(defaults.center == true){
						$(obj).css({marginRight: -defaults.centerPx+'px'});
					}
				}
				
				var buttonArray = defaults.buttons.split(',');
				$.each(buttonArray, function(index,value){
					dcssb_social(value);
				});
				
			}
			
			// Generate buttons
			function dcssb_social(type){
				
				var $button = '';
				var btn = '';
				
				switch (type) {
					case 'twitter': 
					btn = 'none';
					if(size == 'vertical'){
						btn = 'vertical';
					} else if(size == 'horizontal'){
						btn = 'horizontal';
					}
					$button = '<div class="dcssb-btn dcssb-twitter"><a href="http://twitter.com/share" data-url="'+url+'" data-counturl="'+url+'" data-text="'+title+'" class="twitter-share-button" data-count="'+btn+'" data-via="'+defaults.twitterId+'"></a></div><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
					break;
					
					case 'facebook':
					btn = 'standard';
					var fbheight = '30';
					if(size == 'vertical'){
						btn = 'box_count';
						fbheight = '62';
					} else if(size == 'horizontal'){
						btn = 'button_count';
					}
					var $appId = '';
					var $size = 'box_count';
					$button = '<div class="dcssb-btn dcssb-facebook"><iframe src="http://www.facebook.com/plugins/like.php?app_id='+$appId+'&amp;href='+encurl+'&amp;send=false&amp;layout='+btn+'&amp;width=50&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height='+fbheight+'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:'+fbheight+'px;" allowTransparency="true"></iframe></div>';					
					break;
					
					case 'plusone': 
					btn = 'medium';
					var count = 'false';
					if(size == 'vertical'){
						btn = 'tall';
						count = 'true';
					} else if(size == 'horizontal'){
						btn = 'medium';
						count = 'true';
					}
					$button = '<div class="dcssb-btn dcssb-plusone"><g:plusone size="'+btn+'" href="'+url+'" count="'+count+'"></g:plusone></div><script type="text/javascript">(function() {var po = document.createElement("script"); po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/plusone.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s); })(); </script>';
					break;
					
					case 'buzz': 
					btn = 'small-button';
					if(size == 'vertical'){
						btn = 'normal-count';
					} else if(size == 'horizontal'){
						btn = 'small-count';
					}
					var $image_default = '';
					$button = '<div class="dcssb-btn dcssb-buzz"><a href="http://www.google.com/buzz/post" class="google-buzz-button" title="Google Buzz" data-message="'+title+'" data-url="'+url+'" data-imageurl="'+$image_default+'" data-button-style="'+btn+'"></a><script type="text/javascript" src="http://www.google.com/buzz/api/button.js"></script></div>';
					break;
					
					case 'linkedin': 
					btn = 'none';
					if(size == 'vertical'){
						btn = 'top';
					} else if(size == 'horizontal'){
						btn = 'right';
					}
					$button = '<div class="dcssb-btn dcssb-linkedin"><script type="text/javascript" src="http://platform.linkedin.com/in.js"></script><script type="in/share" data-url="'+url+'" data-counter="'+btn+'"></script></div>';
					break;
					
					case 'stumbleupon': 
					btn = '4';
					if(size == 'vertical'){
						btn = '5';
					} else if(size == 'horizontal'){
						btn = '1';
					}
					$button = '<div class="dcssb-btn dcssb-stumble"><iframe src="http://www.stumbleupon.com/badge/embed/'+btn+'/?url='+encurl+'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height: 60px;" allowTransparency="true"></iframe></div>';
					break;
					
					case 'digg': 
					btn = 'DiggIcon';
					if(size == 'vertical'){
						btn = 'DiggMedium';
					} else if(size == 'horizontal'){
						btn = 'DiggCompact';
					}
					$button = '<script type="text/javascript">(function() {var s = document.createElement("SCRIPT"), s1 = document.getElementsByTagName("SCRIPT")[0]; s.type = "text/javascript"; s.async = true; s.src = "http://widgets.digg.com/buttons.js"; s1.parentNode.insertBefore(s, s1); })(); </script><div class="dcssb-btn dcssb-digg"><a href="http://digg.com/submit?url='+encurl+'&amp;title='+title+'" class="DiggThisButton '+btn+'"></a><span style="display: none;">'+description+'</span></div>';
					
					break;
				}
				
				$content.append($button);
			}
		
		});
	};
})(jQuery);
