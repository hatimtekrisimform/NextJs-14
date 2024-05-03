import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { connectToDb } from "./ConnectToDb";
import { User } from "./models";
import { authConfig } from "./auth.config";

const login = async ({ username, password }) => {
  try {
    await connectToDb();

    const user = await User.findOne({ username, password });
    console.log("user in login - ", user);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  } catch (e) {
    throw new Error("login failed");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.Github_ID,
      clientSecret: process.env.Github_Secret,
    }),
    CredentialProvider({
      async authorize({ username, password }) {
        try {
          let user = await login({ username, password });

          const newuser = {
            test: "testing",
            username: user.username,
            isAdmin: user.isAdmin,
            email: user.email,
          };
          return newuser;
        } catch (e) {
          console.log("error in authorize  - ", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log({ user, account, profile });
      if (account.provider == "github") {
        await connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
              password: "password",
            });
            await newUser.save();
          }
        } catch (e) {
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
