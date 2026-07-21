import { Context } from '../index';
interface PostCreateArgs {
  title: string;
  content: string;
}
export const Mutation = {
  postCreate: (_, { title, content }: PostCreateArgs, { prisma }: Context) => {
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: 'You must provide title and content to create a post',
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: prisma.post.create({
        data: {
          title,
          content,
          authorId: 1,
        },
      }),
    };
  },
};
