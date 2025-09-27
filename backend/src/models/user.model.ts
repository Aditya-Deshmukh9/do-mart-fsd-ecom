import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cart from './cart.model';
import Wishlist from './wishlist.model';
import { availableUserRoles, availableUserRolesEnums } from '../constant';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    avatar: {
      type: {
        url: String,
        public_id: String,
        secure_url: String,
        width: Number,
        height: Number,
        format: String,
      },
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: availableUserRolesEnums,
      default: availableUserRoles.USER,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.post('save', async function (user, next) {
  const cart = await Cart.findOne({ owner: user._id });
  const wishlist = await Wishlist.findOne({ owner: user._id });

  if (!cart) {
    await Cart.create({ owner: user._id, items: {} });
  }
  if (!wishlist) {
    await Wishlist.create({ owner: user._id, items: [] });
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '1d',
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '7d',
    }
  );
};

const User = mongoose.model('users', userSchema);

export default User;
