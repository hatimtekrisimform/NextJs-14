export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      

      if (user) {
        console.log("jwt  - ", user)
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session  - ", session,token);
      // if (token) {
      //   session.id = token.id;
      //   session.isAdmin = token.isAdmin;
      // }

      return session;
    },
    authorized({ auth, request }) {
      const user = auth;
      const isOnAdminPortal = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      if (isOnAdminPortal && !user?.isAdmin) {
        return false;
      }
      if (isOnBlogPage && !user) {
        return false;
      }
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
