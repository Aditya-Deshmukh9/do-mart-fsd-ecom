import { cookieOptions } from '../constant';
import User, { IUser } from '../models/user.model';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

const findUser = async (email?: string, username?: string): Promise<IUser | null> => {
  try {
    return (await User.findOne({
      $or: [{ username }, { email }],
    })) as InstanceType<typeof User> | null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new ApiError(500, 'Something went wrong - ' + errorMessage);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    throw new ApiError(400, 'missing required fields');
  }

  const alreadyUser = await findUser(email, username);

  if (alreadyUser) {
    if (alreadyUser.email === email) {
      throw new ApiError(409, 'User already exists');
    }
    if (alreadyUser.username === username) {
      throw new ApiError(409, 'User already exists');
    }
  }

  const data = {
    name,
    email,
    username: username.toLowerCase(),
    password,
  };

  const newUser = new User(data);
  await newUser.save();

  if (!newUser) {
    throw new ApiError(500, 'Something went wrong');
  }

  const user = await User.findById(newUser._id).select('-password');

  if (!user) {
    throw new ApiError(500, 'Something went wrong');
  }

  return res.status(200).json(new ApiResponse(200, user, 'User registered successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    throw new ApiError(400, 'missing required fields');
  }

  // if (req.user) {
  //   return res.status(200).json(new ApiResponse(200, req.user, 'User already logged in'));
  // }

  const user = await findUser(email, username);

  if (!user) {
    throw new ApiError(409, 'User not found');
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const loginInfo = await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true }).select(
    '-password'
  );

  if (!loginInfo) {
    throw new ApiError(500, 'Something went wrong');
  }

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(200, loginInfo, 'User logged in successfully'));
});

export { loginUser, registerUser };
