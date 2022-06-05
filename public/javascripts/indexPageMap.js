console.log(journeys);
let startLat = 40;
let startLong = -100;
if (journeys.length > 0) {
  startLat = journeys[0].waypoints[0].geometry.coordinates[1];
  startLong = journeys[0].waypoints[0].geometry.coordinates[0];
}
let map = L.map('map').setView([startLat, startLong], 3);

let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

journeys.forEach((journey, i) => {
  let lat = journey.waypoints[0].geometry.coordinates[1];
  let long = journey.waypoints[0].geometry.coordinates[0];
  L.marker([lat, long])
    .addTo(map)
    .bindPopup(
      (journey.waypoints.length > 1
        ? 'From: ' +
          journey.waypoints[0].location +
          '<br>To: ' +
          journey.waypoints[journey.waypoints.length - 1].location
        : 'Trip to: ' + journey.waypoints[0].location) +
        '<br>' +
        'Date: ' +
        journey.date.substring(0, 10) +
        '<br>' +
        'Transport: ' +
        journey.transport
    );
});
