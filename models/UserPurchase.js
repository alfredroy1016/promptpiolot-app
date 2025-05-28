const mongoose = require('mongoose');

const userPurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  productId: {
    type: String, // Store the prompt/product ID as string
    required: true
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserPurchase', userPurchaseSchema);
