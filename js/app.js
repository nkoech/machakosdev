/**
 * Created by nkoech on 26/03/2015.
 */

var app = (function(){
    var households = {

        initMap: function() {

            //Get data  token
            L.mapbox.accessToken = 'pk.eyJ1IjoibmtvZWNoIiwiYSI6IllzVF8ya2sifQ.D5WtsqKGS6ulGVPrBwV9mA';

            //Set map options
            map = L.mapbox.map('map', null, {
                maxZoom: 19,
                minZoom: 9
            }).setView([-1.2139,37.5320], 9);
        },

        setMapLayers: function() {

            //Set layers object
            layers = {
                basemap: L.mapbox.tileLayer('nkoech.c858c345').addTo(map),
                m_watertype: L.geoJson(m_watertype),
                m_watercost: L.geoJson(m_watercost),
                m_waterdist: L.geoJson(m_waterdist),
                m_storetank: L.geoJson(m_storetank),
                m_jericanused: L.geoJson(m_jericanused)
            };
        },

       mapComponent: function() {

           layers.basemap.addTo(map); //Add base layer
           households.setMapComponent(layers.m_watertype, 'm_watertype', 'Water Source Type', 1);
           households.setMapComponent(layers.m_watercost, 'm_watercost', '20L Jerrican Cost', 2);
           households.setMapComponent(layers.m_waterdist, 'm_waterdist', 'Water Source Distance', 3);
           households.setMapComponent(layers.m_storetank, 'm_storetank', 'Storage Tank Access', 4);
           households.setMapComponent(layers.m_jericanused, 'm_jericanused', 'Jericans Used Daily', 5);
        },

        setMapComponent: function(fLayer, elId, name, zIndex){
            var elMenu = document.getElementById('menu-ui');
            var elLink = document.createElement('a');

            if(zIndex == 1){
                fLayer.setZIndex(zIndex).addTo(map); // Add initial feature layer
                elLink.href = '#';
                elLink.id = elId;
                elLink.className = 'active';
                elLink.innerHTML = name;
            }else{
                elLink.href = '#';
                elLink.id = elId;
                elLink.className = '';
                elLink.innerHTML = name;
            }

            // Create a simple layer switcher that
            // toggles layers on and off.
            elLink.onclick = function(e) {
                var elMenuUi = map.getContainer().querySelector(".menu-ui"); // Get ".menu-ui" class
                var elAll = elMenuUi.querySelectorAll(".active"); // Get ".active" class

                e.preventDefault();
                e.stopPropagation();
                if(this.className != "active"){
                    for (i = 0; i < elAll.length; i++) {
                        map.removeLayer(layers[elAll[i].id]); // Remove feature layer
                        elAll[i].className = '';
                    }

                    fLayer.addTo(map);
                    this.className = 'active';
                }else{
                    map.removeLayer(fLayer);
                    this.className = '';
                }
            };

            elMenu.appendChild(elLink); // Append the new style to parent element "mrnu-ui"
        }
    };

    return households;
})();

app.initMap();
app.setMapLayers();
app.mapComponent();
