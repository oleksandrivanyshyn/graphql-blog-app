import { Context } from '../../index';
import validator from 'validator';

interface SignupArgs {
  credentials: {
    email: string;
    name: string;
    password: string;
    bio: string;
  };
}

export const authResolvers = {
  signup: async (_: any, { credentials }: SignupArgs, { prisma }: Context) => {
    const { email, name, password } = credentials;

    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [{ message: 'Invalid email' }],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, { min: 5 });
    if (!isValidPassword) {
      return {
        userErrors: [{ message: 'Invalid password' }],
        token: null,
      };
    }

    if (!name || !password) {
      return {
        userErrors: [{ message: 'Invalid name or password' }],
        token: null,
      };
    }
  },
};
