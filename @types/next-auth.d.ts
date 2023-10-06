import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | number;
      isBusinessUser: boolean;
    } & DefaultSession["user"];
  }
}
