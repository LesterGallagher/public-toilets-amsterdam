var amsterdam_centrum_loc = [52.372965, 4.893227];

var greenIcon = L.icon({
    iconUrl: 'css/lib/leaflet/images/marker-icon-green.png',
    iconRetinaUrl: "css/lib/leaflet/images/marker-icon-2x-green.png",
    shadowUrl: 'css/lib/leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'map-page') {

        var map = L.map('map', {
            center: amsterdam_centrum_loc,
            zoom: 15,
            zoomControl: false,
            minZoom: 13,
            maxZoom: 20
        });
        L.control.zoom({
            position: 'topright',
        }).addTo(map);
        L.tileLayer('maps/offline/{z}/{x}/{y}.png', {
            maxNativeZoom: 15,
            maxZoom: 20,
            minZoom: 13,
            bounds: L.latLngBounds([
                [52.40222222, 4.83444444], 
                [52.34888889, 4.96555556]
            ])
        }).addTo(map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 13,
            maxNativeZoom: 18,
            maxZoom: 20
        }).addTo(map);
        var marker = L.marker([0, 0])
            .bindPopup('You', { autoPan: false })
            .addTo(map);
        marker.openPopup();
        var circle = L.circle([0, 0], 1).addTo(map);

        map.on('locationfound', onLocationFound);
        map.locate();

        function onLocationFound(e) {
            var radius = e.accuracy / 2;
            marker.setLatLng(e.latlng);
            circle.setLatLng(e.latlng);
            circle.setRadius(radius);
            marker._popup.setContent("You are within " + radius + " meters from this point")
        }

        function onLocationError() {
            console.warn('Unable to get location');
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        // call locate every 3 seconds... forever
        setInterval(map.locate.bind(map), 3000);

        for(var i = 0; i < data.length; i++) {
            L.marker([data[i].latitude, data[i].longitude], { autoPan: false, icon: greenIcon })
                .bindPopup(createContent(data[i]))
                .addTo(map);
        }
    }
});

document.addEventListener("deviceready", function () {
    if (cordova.platformId === 'browser') {
        document.body.appendChild(document.createElement('script')).src = './js/browser.js';
    } else {
        document.body.appendChild(document.createElement('script')).src = './js/admob.js';
    }
    if (navigator.onLine === false) {
        window.ons.notification.alert({
            message: _app_localization.noConnection[_app_userLang],
        });
    }
}, false);

window.ons.disableAutoStatusBarFill();

function createContent(item) {

    var str = '<b>' + _app_localization.publicToilet[_app_userLang] + '</b><br>';
    if (item.dak) {
        str += _app_localization.locationIsRoofed[_app_userLang];
    } else {
        str += _app_localization.locationIsNotRoofed[_app_userLang];
    }
    str += '<br>'
    if (item.bijzonderheden && _app_localization[item.bijzonderheden][_app_userLang]) {
        str += _app_localization[item.bijzonderheden][_app_userLang];
        str += '<br>'
    }

    str += '<br><small style="color: #999;">';
    str += item.latitude.toString().slice(0, 9);
    str += ' ';
    str += item.longitude.toString().slice(0, 8);
    str += '</small>'
    return str;
}

window.fn = {};
window.fn.open = function(page) {
    document.getElementById('navigator').pushPage(page);
}
