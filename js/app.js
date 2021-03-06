/**
 * Created by Koech Nicholas on 26/03/2015.
 */

var app = (function(){
    var waterAccess = {

        initMap: function() {

            //Get data  token from mapbox
            L.mapbox.accessToken = 'pk.eyJ1IjoibmtvZWNoIiwiYSI6IllzVF8ya2sifQ.D5WtsqKGS6ulGVPrBwV9mA';

            //Set map options
            map = L.mapbox.map('map', null, {
                maxZoom: 14,
                minZoom: 9
            }).setView([-1.456218319528783,37.327423095703125], 11);
        },

        setCircleStyle: function(a, b, c, d, e){
            var circleStyle = {
                radius: a,
                fillColor: b,
                color: c,
                weight: d,
                fillOpacity: e
            };

            return circleStyle;
        },

        setFillColor: function(a, b){
            if(b == "m_watertype"){
                switch (a) {
                    case 'Dam': return "#1E90FF";
                    case 'River':   return "#ff0000";
                    case 'Well': return "#800080";
                    case 'Pond':   return "#008000";
                    case 'Springs':   return "#0000A0";
                    case 'Water Harvesting': return "#800000";
                }
            }else if(b == "m_storetank"){
                switch (a) {
                    case 'Yes': return "#0000A0";
                    case 'No':   return "#ff0000";
                }
            }else{
                return false;
            }
        },

        setProportionalSymbol: function(a, b, c, d, e){

            if (a < b){
                return 4
            }else if(a >= b && a < c){
                return 7
            }else if(a >= c && a < d){
                return 10
            }else if(a >= d && a < e){
                return 13
            }else{
                return 17
            }
        },

        onEachFeature: function(feature, layer, v, p, u){
            var popupOptions = {maxWidth:300};

            if (feature.properties) {

                //onclick  popup
                layer.onclick = (function(layer){
                    layer.bindPopup(
                            "<b>Water Access Information </b> " +
                            "<hr>" +
                            "<b>Name:</b> " + feature.properties.res_name +
                            "<br><b>" + p + ": </b>" + feature.properties[v] + u
                        , popupOptions
                    );
                })(layer);

                layer.on('mouseover', function(e) {

                    if (map) {

                        //highlight feature
                        /*e.target.setStyle({
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7,
                            weight: 3
                        });*/

                        //open popup;
                        popup = L.popup()
                            .setLatLng(e.latlng)
                            .setContent(
                                "<b>Respondent </b> " +
                                "<hr>" +
                                "<b>Name:</b> " + feature.properties.res_name +
                                "<br><small style='color:#336699'>Click point for more...</small>", popupOptions
                            )
                            .openOn(map);

                        if (!L.Browser.ie && !L.Browser.opera) {
                            e.target.bringToFront();
                        }
                    }
                });

                layer.on('mouseout', function(e) {

                    //close popup;
                    if (popup && map) {
                        map.closePopup(popup);
                        popup = null;
                    }
                    //resetStyle(e.target);
                });
            }
        },

        setMapLayers: function() {

            //Set layers object
            layers = {
                basemap: L.mapbox.tileLayer('nkoech.c858c345').addTo(map),

                m_watertype: L.geoJson(m_watertype, {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(
                                latlng,
                                waterAccess.setCircleStyle(6, waterAccess.setFillColor(feature.properties.water_type, "m_watertype"), "#fff", 3, 1)
                        )
                    },
                    onEachFeature: function(feature, layer) {
                        waterAccess.onEachFeature(feature, layer, "water_type", "Water Source", "");
                    }
                }),

                m_watercost: L.geoJson(m_watercost, {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(
                                latlng,
                                waterAccess.setCircleStyle(waterAccess.setProportionalSymbol(feature.properties.water_cost, 30, 35, 40, 45), "#ff0000", "#fff", 3, 1)
                        )
                    },
                    onEachFeature: function(feature, layer) {
                        waterAccess.onEachFeature(feature, layer, "water_cost", "20L Jerican Cost", " Ksh");
                    }
                }),

                m_waterdist: L.geoJson(m_waterdist, {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(
                            latlng,
                            waterAccess.setCircleStyle(waterAccess.setProportionalSymbol(feature.properties.dist_water, 3, 6, 9, 12), "#800080", "#fff", 3, 1)
                        )
                    },
                    onEachFeature: function(feature, layer) {
                        waterAccess.onEachFeature(feature, layer, "dist_water", "Water Distance", " Km");
                    }
                }),

                m_storetank: L.geoJson(m_storetank, {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng,
                            waterAccess.setCircleStyle(6, waterAccess.setFillColor(feature.properties.store_tank, "m_storetank"), "#fff", 3, 1)
                        )
                    },
                    onEachFeature: function(feature, layer) {
                        waterAccess.onEachFeature(feature, layer, "store_tank", "Access Storage Tank ", "");
                    }
                }),

                m_jericanused: L.geoJson(m_jericanused, {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(
                            latlng,
                            waterAccess.setCircleStyle(waterAccess.setProportionalSymbol(feature.properties.jericans_used, 3, 5, 7, 9), "#C15022", "#fff", 3, 1)
                        )
                    },
                    onEachFeature: function(feature, layer) {
                        waterAccess.onEachFeature(feature, layer, "jericans_used", "Jerricans Used Daily", "");
                    }
                })
            };
        },

        mapComponent: function(){
            layers.basemap.addTo(map); //Add base layer
            waterAccess.setMapComponent(layers.m_watertype, 'm_watertype', 'Water Source Type', 1, 'm_watertype_legend');
            waterAccess.setMapComponent(layers.m_watercost, 'm_watercost', '20L Jerrican Cost', 2, 'm_watercost_legend');
            waterAccess.setMapComponent(layers.m_waterdist, 'm_waterdist', 'Water Source Distance', 3, 'm_waterdist_legend');
            waterAccess.setMapComponent(layers.m_storetank, 'm_storetank', 'Storage Tank Access', 4, 'm_storetank_legend');
            waterAccess.setMapComponent(layers.m_jericanused, 'm_jericanused', 'Jericans Used Daily', 5, 'm_jericanused_legend');
        },

        setMapComponent: function(fLayer, elId, name, zIndex, legend){
            var elMenu = document.getElementById('menu-ui');
            var elLink = document.createElement('a');

            if(zIndex == 1){
                fLayer.setZIndex(zIndex).addTo(map); // Add initial feature layer
                map.legendControl.addLegend(document.getElementById(legend).innerHTML);
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
                        map.legendControl.removeLegend(document.getElementById(elAll[i].id + "_legend").innerHTML);
                        map.removeLayer(layers[elAll[i].id]); // Remove feature layer
                        elAll[i].className = '';
                    }

                    fLayer.addTo(map);
                    map.legendControl.addLegend(document.getElementById(legend).innerHTML);
                    this.className = 'active';
                }else{
                    map.legendControl.removeLegend(document.getElementById(legend).innerHTML);
                    map.removeLayer(fLayer);
                    this.className = '';
                }
            };

            elMenu.appendChild(elLink); // Append the new style to parent element "mrnu-ui"
        }
    };

    return waterAccess;
})();

app.initMap();
app.setMapLayers();
app.mapComponent();
