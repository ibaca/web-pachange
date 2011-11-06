// Load Local/Global Menu Pills
$(function() {
  var calendarReference = pachange.calendarReference;
  var subscriptionPartial = pachange.subscriptionPartial;
  var infoPartial = pachange.infoPartial;
  var videosReference = pachange.videosReference;
  var photosReference = pachange.photosReference;
  
	$("#global-menu").tabs();
	$("#local-menu").pills();

	// Local menu [ info | map | subscription ]
	$("#local-menu").live("change", function(event) {
		var fromTab, toTab, partial, subtitle;
		fromTab = $(event.relatedTarget).parent().attr("id");
		toTab = $(event.target).parent().attr("id");
		$("#content-container").empty();
		switch (toTab) {

			case "map-partial":
				subtitle = "Próximos eventos"
				drawCalendarEvents(calendarReference);
				break;
			case  "subscription-partial":
				partial = subscriptionPartial;
				subtitle = "Suscripción a próximo evento"
				break;
			case "videos-partial":
				subtitle = "Galería de vídeos";
				$("#content-container").simpletube({displaytype: "user",feedid: videosReference});
				break;
			case "galery-partial":
				subtitle = "Galería de fotos";
				$("#content-container").pwi({username: photosReference});
				break;
			case "info-partial":
			default:
				partial = infoPartial;
				subtitle = "Información y contacto"
				break;
		}
		// Load partial and subtitle
		if (partial) $("#content-container").load(partial);
		$(".content-header small").html(subtitle);
	})
	// Trigger info for preload
	$("#info-partial a").click();
});
// Generate Configurable Sidebar Elements
$(function(){
  var ulLinks = $("#sidebar-links");
  $.each(pachange.links,function(i,link){
    ulLinks.append("<li><a href='"+link.href+"' target='_blank'>"+link.text+"</a></li>");
  });
  var ulPartners = $("#sidebar-partners");
  $.each(pachange.partners,function(i,partner){
    ulPartners.append("<li><a href='"+partner.href+"' target='_blank'>"+partner.text+"</a></li>");
  });
  var ulBanners = $("#sidebar-banners");
  $.each(pachange.banners,function(i,banner){
    ulBanners.append("<li><img alt='"+banner.text+"' src='"+banner.src+"' /></li>");
  });
});

// Initialize check mail
$(function(){
  // Translate invalid HTML attr to error class
  $("input").live("change",function(event){
    var $i=$(event.target);
    if ($i.is("input:invalid")) { 
      $i.closest(".clearfix").add($i).addClass("error"); }
    else { 
      $i.closest(".clearfix").add($i).removeClass("error"); } 
  });
  // On reset, remove error class
  $("input[type=reset]").live("click",function(event){
    $(event.target).closest("form").find(".error").removeClass("error");
  });
  // Check mails
  $("input[name=email2]").live("change",function(event){
    var $form = $(event.target).closest("form");
    var email = $form.find("input[name=email]");
    var check = $form.find("input[name=email2]");
    var elements = email.add(email.closest(".clearfix")).add(check).add(check.closest(".clearfix"));
    if (email.val() != check.val()) { 
      elements.addClass("error"); }
    else { 
      elements.removeClass("error"); }
  });
});

// Social Share initialization
$(function() {
   $('#social-share').dcSocialShare();
})

//TODO A partir de aqui odigo algo sucio por falta de tiempo...
function drawCalendarEvents(calendarId) {
  jQuery.support.cors = true; //FIX problema IE9 no carga mapas
  // Mas info en http://stackoverflow.com/questions/5241088/jquery-call-to-webservice-returns-no-transport-error
  // migue calendar: q1r3n14vi5icbv00ta1pjpinhc%40group.calendar.google.com
  var calendarUrl = "http://www.google.com/calendar/feeds/"+calendarId+"/public/full?alt=json";
  $.getJSON(calendarUrl, function(data) {
    $.each(data.feed.entry, function(i, entry) {
      var title = entry.title.$t,
          description = entry.content.$t, 
          link = entry.link[0].href, 
          when = entry.gd$when[0].startTime, 
          date = new Date(when), 
          fdate = date.toISOString().substr(0,10),
          where = entry.gd$where[0].valueString, 
          content;

      // Generate content
      content = $("<div class='event'></div>");
      content.append("<h2><a href='"+link+"' target='_blank'><alt>"+fdate+"</alt>"+title+"<small>"+where+"</small></a></h2>");
      content.append("<p><em>"+description+"</em></p><div class='gmaps-container'></div></p>");
      content.appendTo("#content-container");

      // Activate Google Maps
      var map = createGoogleMap(content.find(".gmaps-container")[0]);
      centerAddress(map, where);
    });
  });
}

//http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
function createGoogleMap(element) {
	var latlng = new google.maps.LatLng(36.719, -4.423);
	var options = {
		zoom : 8,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	}
	return new google.maps.Map(element, options);
}

var geocoder = geocoder = new google.maps.Geocoder();
function centerAddress(map, address) {
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(12);
			var marker = new google.maps.Marker({
				map : map,
				position : results[0].geometry.location
			});
		} else {
			console.log("Geocode was not successful for the following reason: " + status);
		}
	});
}