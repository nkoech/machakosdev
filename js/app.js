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

        getMapComponent: function() {

            //Set layers
            layers = {
                basemap: L.mapbox.tileLayer('nkoech.c858c345').addTo(map),
                m_jericanused: L.geoJson(m_jericanused),
                m_storetank: L.geoJson(m_storetank),
                m_watercost: L.geoJson(m_watercost)
            };
            /*m_waterdist: L.geoJson(m_waterdist),
             m_watertype: L.geoJson(m_watertype)*/
        },

       mapComponent: function() {

            //Add initial data, grid and controls to map
            layers.basemap.addTo(map);
            //layers.m_jericanused.addTo(map);
            //layers.m_storetank.addTo(map);
            //layers.m_watercost.addTo(map);
            //layers.m_waterdist.addTo(map);
            //layers.m_watertype.addTo(map);

            households.addMapComponent(layers.m_jericanused, 'm_jericanused', 'Jerican Used', 1);
            households.addMapComponent(layers.m_storetank, 'm_storetank', 'Store Tank', 2);
            households.addMapComponent(layers.m_watercost, 'm_watercost', 'Cost of Water', 3);
        },

        addMapComponent: function(fLayer, elId, name, zIndex){
            var layersList = document.getElementById('menu-ui');
            var link = document.createElement('a');

            if(zIndex == 1){
                fLayer.setZIndex(zIndex).addTo(map);
                link.href = '#';
                link.id = elId;
                link.className = 'active';
                link.innerHTML = name;
            }else{
                link.href = '#';
                link.id = elId;
                link.className = '';
                link.innerHTML = name;
            }

            // Create a simple layer switcher that
            // toggles layers on and off.
            link.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                if(this.className != "active"){

                    elMenuUi = map.getContainer().querySelector(".menu-ui");
                    elAll = elMenuUi.querySelectorAll(".active");

                    for (i = 0; i < elAll.length; i++) {
                        map.removeLayer(layers[elAll[i].id]);
                        //console.log(elAll[i].id);
                        elAll[i].className = '';
                    }

                    fLayer.addTo(map);
                    this.className = 'active';
                }else{
                    map.removeLayer(fLayer);
                    this.className = '';
                }
            };

            layersList.appendChild(link);
        }
    };

    return households;
})();

app.initMap();
app.getMapComponent();
app.mapComponent();
