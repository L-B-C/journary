const startLat = journey.waypoints[0].geometry.coordinates[1];
const startLong = journey.waypoints[0].geometry.coordinates[0];
let map = L.map('map').setView([startLat, startLong], 8);

let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

journey.waypoints.forEach((waypoint, i) => {
  let lat = waypoint.geometry.coordinates[1];
  let long = waypoint.geometry.coordinates[0];
  L.marker([lat, long])
    .addTo(map)
    .bindPopup(i + 1 + '. ' + waypoint.location);
});
