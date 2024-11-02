declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken: string;
      avatarUrl?: string | null;
      role: "USER" | "ADMIN";
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    role: "USER" | "ADMIN";
    accessToken: string;
  }

  interface JWT {
    user: {
      id: string;
      avatarUrl?: string | null;
      name: string;
      email: string;
      accessToken: string;
      role: "USER" | "ADMIN";
    };
  }
}
