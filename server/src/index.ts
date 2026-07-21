import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Prisma, PrismaClient } from '@prisma/client';
import { Query } from './resolvers/Query';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
  context: { prisma },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
