import type { User } from "@/interfaces/user.interace";

export interface AuthResponse {
  user: User;
  token: string;
}
