import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    me: User
    posts: [Post!]!
    profile(userId: ID!): Profile
  }
  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    signup(credentials: SignupInput!): AuthPayload!
    signin(credentials: SigninInput!): AuthPayload!
    postPublish(postId: ID!): PostPayload!
    postUnpublish(postId: ID!): PostPayload!
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post!]!
  }
  type Profile {
    id: ID!
    bio: String!
    isMyProfile: Boolean!
    user: User!
  }
  type UserError {
    message: String!
  }
  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }
  input PostInput {
    title: String
    content: String
  }
  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }

  input SignupInput {
    email: String!
    name: String!
    password: String!
    bio: String!
  }
  input SigninInput {
    email: String!
    password: String!
  }
`;
