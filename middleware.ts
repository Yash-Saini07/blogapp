import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Where to send unauthorized users
  },
});

export const config = {
  // Protects /admin and any route inside it (e.g. /admin/blogs)
  matcher: ["/admin/:path*"],
};