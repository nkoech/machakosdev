/**
 * Created by nkoech on 26/03/2015.
 */

var app = (function(){
    var households = {

        initMap: function() {

            //Get layer  token
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
                baselayer0: L.mapbox.tileLayer('nkoech.c858c345'),
                m_jericanused: L.geoJson(m_jericanused),
                m_storetank: L.geoJson(m_storetank),
                m_watercost: L.geoJson(m_watercost),
                m_waterdist: L.geoJson(m_waterdist),
                m_watertype: L.geoJson(m_watertype)
            };
        },

        mapComponent: function() {

            //Add initial layer, grid and controls to map
            layers.baselayer0.addTo(map);
            //layers.m_jericanused.addTo(map);
            //layers.m_storetank.addTo(map);
            //layers.m_watercost.addTo(map);
            //layers.m_waterdist.addTo(map);
            //layers.m_watertype.addTo(map);

        }
    };

    return households;
})();

app.initMap();
app.getMapComponent();
app.mapComponent();
