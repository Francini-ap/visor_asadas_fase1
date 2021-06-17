// Mapa Leaflet
var mapa = L.map('mapid').setView([10, -84], 8);

// Definición de capas base

// Segunda capa base
var capa_hot = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png', 
   {
	maxZoom: 19,
	attribution: '="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ</a>'
   }
).addTo(mapa);


	
// Conjunto de capas base
var capas_base = {
  
  "Mapa base" : capa_hot,

  
};  
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);


// Capa vectorial impacto proyectos por canton en formato GeoJSON
$.getJSON("https://francini-ap.github.io/datos_proyectosasadas-pnud/proyecto_asadas2.geojson", function(geodata) {
  var capa_protectos = L.geoJson(geodata, {
    style: function(feature) {
	  return { 'color': "#4f91e1", 'weight': 1.5, 'fillOpacity': 0.50 }
    },
    onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.nom_proyec+
	  "<h3></div><hr><table><tr><td>Cantón: "+feature.properties.canton+
	  "</td></tr><tr><td>Marcador de Género:"+feature.properties.mar_genero+
	  "</td></tr><tr><td>Poblacion Alcanzada: "+feature.properties.alcance_pe+
	  "</td></tr><tr><td>Comunidades Alcanzada: "+feature.properties.comunidades+
	  "</td></tr><tr><td>Presupuesto: "+feature.properties.presupuest+
	  "</td></tr><tr><td>Donante: "+feature.properties.donante+
	  "</td></tr><tr><td>Proyecto Asadas: "+"<a href='https://www.cr.undp.org/content/costarica/es/home/projects/fortalecimiento-de-las-capacidades-de-acueductos-rurales-para-en.html" + "'>Más información</a>"+
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
  }).addTo(mapa);

  control_capas.addOverlay(capa_protectos  , 'Impacto Proyecto ASADAS');

});	

	

// Control de escala
   L.control.scale ({position:'topright', imperial: false}).addTo(mapa)
   