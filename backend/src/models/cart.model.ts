import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1'],
            default: 1,
          },
          size: {
            type: String,
            default: 'M',
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('carts', cartSchema);

export default Cart;
