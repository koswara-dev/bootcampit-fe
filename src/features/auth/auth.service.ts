import type { LoginForm } from "./auth.schema";
import type { User } from "@/app/store/auth.store";

export const login = async (data: LoginForm): Promise<{ token: string; user: User }> => {
  // Mockup data for login
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "admin@bootcamp.it" && data.password === "password") {
        resolve({
          token: "mock-admin-token-12345",
          user: {
            id: "1",
            name: "Admin User",
            email: "admin@bootcamp.it",
            role: "ADMIN",
            avatar: "https://ui-avatars.com/api/?name=Admin+User"
          }
        });
      } else if (data.email === "marketing@bootcamp.it" && data.password === "password") {
        resolve({
          token: "mock-marketing-token-12345",
          user: {
            id: "2",
            name: "Marketing User",
            email: "marketing@bootcamp.it",
            role: "MARKETING",
            avatar: "https://ui-avatars.com/api/?name=Marketing+User"
          }
        });
      } else {
        reject(new Error("Invalid credentials. Try admin@bootcamp.it or marketing@bootcamp.it with 'password'."));
      }
    }, 1000);
  });
};
