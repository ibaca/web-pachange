function cargarVideo(){
    $.ajax({
        url:'videos.html', 
        success: function(data){
            $('#principal').html(data);
            $('#principal').youTubeChannel({ 
                //Cambiar el nombre de usuario a pachange
                userName: 'Fernan180',
                hideNumberOfRatings: false,
                removeBordersFromImage: false,
                loadingText: "Loading...",
                linksInNewWindow: false,
                hideVideoLength: false,
                hideFrom: false,
                hideViews: false,
                hideRating: false
            }); 
        }           
    });
};
           
function drawCalendarEvents() {
    var calendarUrl = "http://www.google.com/calendar/feeds/q1r3n14vi5icbv00ta1pjpinhc%40group.calendar.google.com/public/full?alt=json";
    jQuery.getJSON(calendarUrl, function(data) {
        $.each(data.feed.entry, function(i,entry){
            var description = entry.content.$t,
            link = entry.link[0].href,
            when = entry.gd$when[0].startTime,
            date = new Date(when),
            where = entry.gd$where[0].valueString,
            content;
      
            // Generate content
            content = $("<div></div>");
            content.append("<h2>Evento día"+date.toDateString()+"</h2>");
            content.find("h2").append("<small>"+where+"</small>");
            content.append("<p/>").find("p")
            .append("<div class='gmaps-container' data-where='"+where+"'></div>")
            .append("Descipción: "+description+"<br>");
      
            // Activate Google Maps
            content.find(".gmaps-container").gMap({
                markers: [{
                    address: where, 
                    html: description+" en "+where, 
                    popup: true
                }]
            });
      
            // Append to page
            content.appendTo("#principal");
        });
    });
}
//http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
var geocoder;
var map;
function initializeGoogleMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode( {
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


function checkmail(formulario){
    var x = document.forms["formulario"]["email"].value;
    var y = document.forms["formulario"]["email2"].value
    if (x != y) {
        formulario.setCustomValidity('Las dos direcciones de e-mail no coinciden');
    } 
    else {
        formulario.setCustomValidity('');
    }
        
}
            
function idioma(l){
    $("#principal").toggleClass('evento');
    $("#principal").removeAttr('class');
    $("#principal").removeAttr('style');
    //$("#principal").toggleClass('principal');
    switch(l){
        case 'ingles' :
            $.ajax({
                url:'ingles.html', 
                success: function(data){
                    $('#principal').html(data);
                }
            }); 
            break;
        case 'español':
            $.ajax({
                url:'español.html', 
                success: function(data){
                    $('#principal').html(data);
                }
            }); 
            break;
        case 'aleman':
            $.ajax({
                url:'aleman.html', 
                success: function(data){
                    $('#principal').html(data);
                }
            }); 
            break;
    }
}
            
            
$(document).ready(function(){
    //    $('#social').dcSocialShare({
    //      buttons: "twitter,facebook,plusone",
    //      location: 'top',
    //      align: 'left',
    //      offsetLocation: 50,
    //      offsetAlign: 30,
    //      tabText: '',
    //      width: 120,
    //      center: true,
    //      centerPx: 577,
    //      size:   "vertical",
    //      speedContent: 600,
    //      speedFloat: 1600,
    //      disableFloat: true
    //    });    
    //    $("#sidebar div.content").hide();
    //    $("#sidebar div.content:first").show();
    //    $("#sidebar h3").bind("click", function() {
    //      if ( $(this).next().css("display") == 'none' ) {
    //        $("#sidebar div.content").hide();
    //        $(this).next().slideDown("slow");
    //      }
    //    });     
         
    })
      
// Load Local/Global Menu Pills
$(function(){ 
    $("#global-menu").tabs();
    $("#local-menu").pills(); 
        
    // Local menu [ info | map | subscription ]
    $("#local-menu").live("change", function(event){
        var fromTab, toTab, partial, subtitle;
        fromTab = $(event.relatedTarget).parent().attr("id");
        toTab = $(event.target).parent().attr("id");
        switch (toTab) {
            
            case "map-partial":
                partial="partials/map.html";
                subtitle="Próximo evento"
                break;
            case  "subscription-partial":
                partial="partials/subscription.html"; 
                subtitle="Suscripción a próximo evento"
                break;
            case "videos-partial":
                partial="partials/videos.html";
                subtitle="Galería de vídeos"
                break;
            case "info-partial": 
            default:
                partial="partials/info.html";
                subtitle="Información y contacto"
                break; 
        }
        // Load partial and subtitle
        $("#principal").load(partial);
        $(".page-header small").html(subtitle);
    })
    // Trigger info for preload
    $("#info-partial a").click();
});