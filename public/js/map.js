const thunderforestKey = mapToken;

const map = L.map('map').setView([coordinates[1], coordinates[0]], 13);

L.tileLayer(`https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${thunderforestKey}`, {
  attribution: '&copy; Thunderforest, OpenStreetMap contributors',
  maxZoom: 15
}).addTo(map);

// Use a red marker icon
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Add red marker
L.marker([coordinates[1], coordinates[0]], { icon: redIcon })
  .addTo(map)
  .bindPopup('Listing Location')
  .openPopup();

// Add red zone circle
L.circle([coordinates[1], coordinates[0]], {
  color: 'red',
  fillColor: '#f03',
  stroke: false,
  fillOpacity: 0.2,
  radius: 300 // meters
}).addTo(map);




