/**
 * jQuery gMap v3
 *
 * @url http://www.smashinglabs.pl/gmap
 * @author Sebastian Poreba <sebastian.poreba@gmail.com>
 * @version 3.2.0
 * @date 19.08.2011
 */
(function(i){var d=google.maps,m=new d.Geocoder,n=0,e={},e={init:function(a){var b,c=i.extend({},i.fn.gMap.defaults,a);for(b in i.fn.gMap.defaults.icon)c.icon[b]||(c.icon[b]=i.fn.gMap.defaults.icon[b]);return this.each(function(){var a=i(this),b=e._getMapCenter.apply(a,[c]);if(c.zoom=="fit")c.zoom=e.autoZoom.apply(a,[c]);var j=new d.Map(this,{zoom:c.zoom,center:b,mapTypeControl:c.mapTypeControl,zoomControl:c.zoomControl,panControl:c.panControl,scaleControl:c.scaleControl,streetViewControl:c.streetViewControl,
mapTypeId:c.maptype,scrollwheel:c.scrollwheel,maxZoom:c.maxZoom,minZoom:c.minZoom});c.log&&console.log("map center is:");c.log&&console.log(b);a.data("$gmap",j);a.data("gmap",{opts:c,gmap:j,markers:[],markerKeys:{},infoWindow:null});if(c.controls.length!==0)for(b=0;b<c.controls.length;b+=1)j.controls[c.controls[b].pos].push(c.controls[b].div);c.markers.length!==0&&e.addMarkers.apply(a,[c.markers]);e._onComplete.apply(a,[])})},_onComplete:function(){var a=this.data("gmap"),b=this;if(n!==0)window.setTimeout(function(){e._onComplete.apply(b,
[])},1E3);else a.opts.onComplete()},_setMapCenter:function(a){var b=this.data("gmap");b.opts.log&&console.log("delayed setMapCenter called");if(b.gmap!==void 0)b.gmap.setCenter(a);else{var c=this;window.setTimeout(function(){e._setMapCenter.apply(c,[a])},500)}},_boundaries:null,_getBoundaries:function(a){if(e._boundaries)return e._boundaries;var b=a.markers[0].latitude,c=a.markers[0].longitude,d=a.markers[0].longitude,f=a.markers[0].latitude,j;for(j=1;j<a.markers.length;j+=1){if(b>a.markers[j].latitude)b=
a.markers[j].latitude;if(c<a.markers[j].longitude)c=a.markers[j].longitude;if(d>a.markers[j].longitude)d=a.markers[j].longitude;if(f<a.markers[j].latitude)f=a.markers[j].latitude}e._boundaries={N:b,E:c,W:d,S:f};return e._boundaries},_getMapCenter:function(a){var b,c=this,g,f;if(a.markers.length&&(a.latitude=="fit"||a.longitude=="fit"))return b=e._getBoundaries(a),b=new d.LatLng((b.N+b.S)/2,(b.E+b.W)/2);if(a.latitude&&a.longitude)return b=new d.LatLng(a.latitude,a.longitude);else b=new d.LatLng(0,
0);if(a.address)return m.geocode({address:a.address},function(b,d){d===google.maps.GeocoderStatus.OK?e._setMapCenter.apply(c,[b[0].geometry.location]):a.log&&console.log("Geocode was not successful for the following reason: "+d)}),b;if(a.markers.length>0){f=null;for(g=0;g<a.markers.length;g+=1)if(a.markers[g].setCenter){f=a.markers[g];break}if(f===null)for(g=0;g<a.markers.length;g+=1){if(a.markers[g].latitude&&a.markers[g].longitude){f=a.markers[g];break}a.markers[g].address&&(f=a.markers[g])}if(f===
null)return b;if(f.latitude&&f.longitude)return new d.LatLng(f.latitude,f.longitude);f.address&&m.geocode({address:f.address},function(b,d){d===google.maps.GeocoderStatus.OK?e._setMapCenter.apply(c,[b[0].geometry.location]):a.log&&console.log("Geocode was not successful for the following reason: "+d)})}return b},setZoom:function(a){var b=this.data("gmap").gmap;a==="fit"&&(a=e.autoZoom.apply(i(this),[]));b.setZoom(parseInt(a))},getRoute:function(a){var b=this.data("gmap"),c=b.gmap,g=new d.DirectionsRenderer,
f=new d.DirectionsService,j={BYCAR:d.DirectionsTravelMode.DRIVING,BYBICYCLE:d.DirectionsTravelMode.BICYCLING,BYFOOT:d.DirectionsTravelMode.WALKING},h={MILES:d.DirectionsUnitSystem.IMPERIAL,KM:d.DirectionsUnitSystem.METRIC},e=null,k=null,l=null;a.routeDisplay!==void 0?e=a.routeDisplay instanceof jQuery?a.routeDisplay[0]:typeof a.routeDisplay=="string"?i(a.routeDisplay)[0]:null:b.opts.routeDisplay!==null&&(e=b.opts.routeDisplay instanceof jQuery?b.opts.routeDisplay[0]:typeof b.opts.routeDisplay=="string"?
i(b.opts.routeDisplay)[0]:null);g.setMap(c);e!==null&&g.setPanel(e);k=j[b.opts.travelMode]!==void 0?j[b.opts.travelMode]:j.BYCAR;l=h[b.opts.travelUnit]!==void 0?h[b.opts.travelUnit]:h.KM;f.route({origin:a.from,destination:a.to,travelMode:k,unitSystem:l},function(a,c){c==d.DirectionsStatus.OK?g.setDirections(a):e!==null&&i(e).html(b.opts.routeErrors[c])});return this},processMarker:function(a,b,c,g){var f=this.data("gmap"),e=f.gmap,h=f.opts,i;g===void 0&&(g=new d.LatLng(a.latitude,a.longitude));if(!b)var k=
{image:h.icon.image,iconSize:new d.Size(h.icon.iconsize[0],h.icon.iconsize[1]),iconAnchor:new d.Point(h.icon.iconanchor[0],h.icon.iconanchor[1]),infoWindowAnchor:new d.Size(h.icon.infowindowanchor[0],h.icon.infowindowanchor[1])},b=new d.MarkerImage(k.image,k.iconSize,null,k.iconAnchor);c||(new d.Size(h.icon.shadowsize[0],h.icon.shadowsize[1]),k&&k.iconAnchor||new d.Point(h.icon.iconanchor[0],h.icon.iconanchor[1]));i=new d.Marker({position:g,icon:b,title:a.title,map:e});i.setShadow(c);f.markers.push(i);
a.key&&(f.markerKeys[a.key]=i);var l;a.html&&(b={content:typeof a.html==="string"?h.html_prepend+a.html+h.html_append:a.html,pixelOffset:a.infoWindowAnchor},h.log&&console.log("setup popup with data"),h.log&&console.log(b),l=new d.InfoWindow(b),d.event.addListener(i,"click",function(){h.log&&console.log("opening popup "+a.html);h.singleInfoWindow&&f.infoWindow&&f.infoWindow.close();l.open(e,i);f.infoWindow=l}));if(a.html&&a.popup)h.log&&console.log("opening popup "+a.html),l.open(e,i),f.infoWindow=
l},_geocodeMarker:function(a,b,c){n+=1;var g=this;m.geocode({address:a.address},function(f,j){n-=1;j===d.GeocoderStatus.OK?(g.data("gmap").opts.log&&console.log("Geocode was successful with point: ",f[0].geometry.location),e.processMarker.apply(g,[a,b,c,f[0].geometry.location])):g.data("gmap").opts.log&&console.log("Geocode was not successful for the following reason: "+j)})},autoZoom:function(a){var b=this.data("gmap"),c,d=39135.758482,a=b?b.opts:a;a.log&&console.log("autozooming map");b=e._getBoundaries(a);
a=(b.E-b.W)*111E3/this.width();c=(b.S-b.N)*111E3/this.height();for(b=2;b<20;b+=1){if(a>d||c>d)break;d/=2}return b-2},addMarkers:function(a){var b=this.data("gmap").opts;if(a.length!==0){b.log&&console.log("adding "+a.length+" markers");for(b=0;b<a.length;b+=1)e.addMarker.apply(i(this),[a[b]])}return this},addMarker:function(a){var b=this.data("gmap").opts;b.log&&console.log("putting marker at "+a.latitude+", "+a.longitude+" with address "+a.address+" and html "+a.html);var c=b.icon.image,g=new d.Size(b.icon.iconsize[0],
b.icon.iconsize[1]),f=new d.Point(b.icon.iconanchor[0],b.icon.iconanchor[1]),j=new d.Size(b.icon.infowindowanchor[0],b.icon.infowindowanchor[1]),h=b.icon.shadow,i=new d.Size(b.icon.shadowsize[0],b.icon.shadowsize[1]),k=f;a.infoWindowAnchor=j;if(a.icon){if(a.icon.image)c=a.icon.image;a.icon.iconsize&&(g=new d.Size(a.icon.iconsize[0],a.icon.iconsize[1]));a.icon.iconanchor&&(f=new d.Point(a.icon.iconanchor[0],a.icon.iconanchor[1]));a.icon.infowindowanchor&&new d.Size(a.icon.infowindowanchor[0],a.icon.infowindowanchor[1]);
if(a.icon.shadow)h=a.icon.shadow;a.icon.shadowsize&&(i=new d.Size(a.icon.shadowsize[0],a.icon.shadowsize[1]))}c=new d.MarkerImage(c,g,null,f);h=new d.MarkerImage(h,i,null,k);if(a.address){if(a.html==="_address")a.html=a.address;if(a.title=="_address")a.title=a.address;b.log&&console.log("geocoding marker: "+a.address);e._geocodeMarker.apply(this,[a,c,h])}else{if(a.html==="_latlng")a.html=a.latitude+", "+a.longitude;if(a.title=="_latlng")a.title=a.latitude+", "+a.longitude;b=new d.LatLng(a.latitude,
a.longitude);e.processMarker.apply(this,[a,c,h,b])}return this},removeAllMarkers:function(){var a=this.data("gmap").markers,b;for(b=0;b<a.length;b+=1)a[b].setMap(null),delete a[b];a.length=0},getMarker:function(a){return this.data("gmap").markerKeys[a]}};i.fn.gMap=function(a){if(e[a])return e[a].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof a==="object"||!a)return e.init.apply(this,arguments);else i.error("Method "+a+" does not exist on jQuery.gmap")};i.fn.gMap.defaults={log:!1,
address:"",latitude:null,longitude:null,zoom:3,maxZoom:null,minZoom:null,markers:[],controls:{},scrollwheel:!0,maptype:google.maps.MapTypeId.ROADMAP,mapTypeControl:!0,zoomControl:!0,panControl:!1,scaleControl:!1,streetViewControl:!0,singleInfoWindow:!0,html_prepend:'<div class="gmap_marker">',html_append:"</div>",icon:{image:"http://www.google.com/mapfiles/marker.png",iconsize:[20,34],iconanchor:[9,34],infowindowanchor:[9,2],shadow:"http://www.google.com/mapfiles/shadow50.png",shadowsize:[37,34]},
onComplete:function(){},travelMode:"BYCAR",travelUnit:"KM",routeDisplay:null,routeErrors:{INVALID_REQUEST:"The provided request is invalid.",NOT_FOUND:"One or more of the given addresses could not be found.",OVER_QUERY_LIMIT:"A temporary error occured. Please try again in a few minutes.",REQUEST_DENIED:"An error occured. Please contact us.",UNKNOWN_ERROR:"An unknown error occured. Please try again.",ZERO_RESULTS:"No route could be found within the given addresses."}}})(jQuery);



