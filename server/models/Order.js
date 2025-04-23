import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    }
  ],

  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },

  paymentMethod: {
    type: String,
    default: 'Cash on Delivery', // optional
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  isDelivered: {
    type: Boolean,
    default: false,
  },

  paidAt: Date,
  deliveredAt: Date,
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
