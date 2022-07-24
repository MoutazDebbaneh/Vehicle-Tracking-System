const mongoose = require("mongoose");

const rideSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["public", "private"],
  },
  repeatition: {
    is_repeatitive: { type: Boolean, default: false },
    frequency: {
      type: String,
      default: null,
      validate: {
        validator: (value) => {
          const re = /(Mon-)?(Tue-)?(Wed-)?(Thu-)?(Fri-)?(Sat-)?(Sun-)?/;
          return value.match(re);
        },
        message: "Please enter a valid repeatition frequency",
      },
    },
  },
  start: { type: String },
  end: { type: String },
  date: { type: Date },
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
