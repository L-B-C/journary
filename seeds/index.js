const mongoose = require('mongoose');
const cities = require('./cities');
const { transports } = require('./seedHelpers');
const Journey = require('../models/journeyModel');

mongoose.connect('mongodb://localhost:27017/journary');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
function randomDate(start, end) {
  let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
//Create 300 random journey each with a random number of waypoints (max 10)
const seedDB = async () => {
  await Journey.deleteMany({});
  for (let i = 0; i < 300; i++) {
    let waypoints = [];
    //Insert waypoints
    for (let j = 0; j < Math.ceil(Math.random() * 10); j++) {
      const randomWaypoint = Math.floor(Math.random() * 1000);
      waypoints.push({
        location: `${cities[randomWaypoint].city}, ${cities[randomWaypoint].state}`,
        geometry: {
          type: 'Point',
          coordinates: [cities[randomWaypoint].longitude, cities[randomWaypoint].latitude],
        },
      });
    }
    const journey = new Journey({
      author: '628dc97392c1fb287e1a05c6',
      date: randomDate(new Date(2020, 1, 1), new Date()),
      transport: `${sample(transports)}`,
      waypoints: waypoints,
    });
    await journey.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
