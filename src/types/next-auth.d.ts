import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image?: string | null;
      name: string;
      email: string;
      accessToken: string;
    };
  }

  interface JWT {
    user: {
      id: string;
      image?: string | null;
      name: string;
      email: string;
      accessToken: string;
    };
  }
}
