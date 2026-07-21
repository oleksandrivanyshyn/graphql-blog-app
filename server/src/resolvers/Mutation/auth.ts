import { Context } from '../../index';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        profile: {
          create: {
            bio,
          },
        },
      },
    });

    const token = JWT.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: 3600000 },
    );

    return {
      userErrors: [],
      token,
    };
  },
};
