// Local http PORT
export const PORT: number = Number(process.env.PORT) || 8000;

// Cookie options
export const cookieOptions: {
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'none' | 'lax' | 'strict';
  path: string;
  maxAge: number;
} = {
  secure: true,
  httpOnly: true,
  sameSite: 'none',
  path: '/',
  maxAge: 864000000, // 10 days
};

export const availableUserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const availableUserRolesEnums = Object.values(availableUserRoles);
