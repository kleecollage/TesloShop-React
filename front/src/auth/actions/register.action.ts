import { tesloApi } from "@/api/teslo-api"
import type { AuthResponse } from "@/auth/interfaces/auth.response";

export const registerAction = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {fullName, email, password });
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}