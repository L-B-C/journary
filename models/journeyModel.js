const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JourneySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  date: Date,
  transport: String,
  waypoints: [
    {
      location: String,
      geometry: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
  ],
});

module.exports = mongoose.model('JourneyModel', JourneySchema);
