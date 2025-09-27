import { asyncHandler } from '../utils/async-handler';

const loginController = asyncHandler(async (req, res) => {
  res.json({ message: 'Login successful' });
});

export { loginController };
