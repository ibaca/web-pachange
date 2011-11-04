function cargarVideo() {
	$.ajax({
		url : 'videos.html',
		success : function(data) {
			$('#content-container').html(data);
			$('#content-container').youTubeChannel({
				//Cambiar el nombre de usuario a pachange
				userName : 'Fernan180',
				hideNumberOfRatings : false,
				removeBordersFromImage : false,
				loadingText : "Loading...",
				linksInNewWindow : false,
				hideVideoLength : false,
				hideFrom : false,
				hideViews : false,
				hideRating : false
			});
		}
	});
};



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
      content.append("<h2><alt>"+fdate+"</alt>"+title+"<small>"+where+"</small></h2>");
      content.append("<p><em>"+description+"</em></p><div class='gmaps-container'></div></p>");
      content.appendTo("#content-container");

      // Activate Google Maps
      var map = createGoogleMap(content.find(".gmaps-container")[0]);
      centerAddress(map, where);
      // content.find(".gmaps-container").each({
      // markers: [{
      // address: where,
      // html: description+" en "+where,
      // popup: true
      // }]
      // });
      //
      // Append to page

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

// Load Local/Global Menu Pills
$(function() {
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
				drawCalendarEvents("i5obi89aqj0po4faq0ndt2794c@group.calendar.google.com");
				break;
			case  "subscription-partial":
				partial = "partials/subscription.html";
				subtitle = "Suscripción a próximo evento"
				break;
			case "videos-partial":
				subtitle = "Galería de vídeos";
				$("#content-container").simpletube({displaytype:"user",feedid:"aquacentaur"});
				break;
			case "galery-partial":
				subtitle = "Galería de fotos";
				$("#content-container").pwi({username: 'ignacio.bacamt'});
				break;
			case "info-partial":
			default:
				partial = "partials/info.html";
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
