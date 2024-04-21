// import NextAuth from "next-auth";

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's name. */
//       uid: string;
//     };
//   }
//}

// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * This example extends the session to include user id as a string.
   */
  interface Session {
    id?: string;
    user: {
      uid: string;
    } & DefaultSession['user'];
  }
}
