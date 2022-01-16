import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GitlabProvider from "next-auth/providers/gitlab";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import store from "store/store";

export default NextAuth({
  adapter: PrismaAdapter(store),
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: ({ session, user }) => {
      if (session.user && user.id)
        session.user.id = user.id;
      return session;
    },
  },
  session: {
    strategy: "database",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_ID,
      clientSecret: process.env.GITLAB_SECRET,
    })
  ]
});