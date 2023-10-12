import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isBusinessUser: boolean;
    } & DefaultSession["user"];
  }
}
