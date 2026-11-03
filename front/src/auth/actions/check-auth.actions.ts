import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "@/auth/interfaces/auth.response";
import { toast } from "sonner";

export const checkoutAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status')
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    toast.error(error);
    localStorage.removeItem('token');
    throw new Error('Token expired or not valid');
  }
}