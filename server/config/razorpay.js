// Instantiate the razorpay instance with key_id & key_secret

require('dotenv').config() ;
const Razorpay = require('razorpay');

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = instance ;