import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./ConnectToDb";
import { User } from "./models";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.Github_ID,
      clientSecret: process.env.Github_Secret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log({ user, account, profile });
      if (account.provider == "github") {
        await connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          console.log("user in db - ", user);
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
              password: "password",
            });
            await newUser.save();
            console.log("user created");
          }
        } catch (e) {
          return false;
        }
      }
      return true;
    },
  },
});
