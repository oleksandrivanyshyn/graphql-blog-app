import { Context } from '../../index';

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

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return {
      userErrors: [],
      token: 'dummy-token',
    };
  },
};
