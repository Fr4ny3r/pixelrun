export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard/:path*", "/profile/:path*", "/games/:path*", "/wallet/:path*"] };