import apiClient from "@/services/apiClient.ts";
import type {User} from "@/types/user.ts";

interface AuthResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    user: User
  }
}

export const registerNewUser =
  async (username: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response =
      await apiClient.post<AuthResponse>('auth/register', {
        username,
        email,
        password,
      })
    return response.data;
  } catch (error: any) {
    const response = error.response.data;
    // Check if it's a validation error with messages
    if (response?.data && typeof response.data === 'object') {
      // Flatten all error messages into a single array
      const errors = Object.values(response.data).flat();

      // Combine them into a single string (optional)
      const message = errors.join('\n');

      throw new Error(message);
    }
    throw new Error('Network error, please check your connection.');
  }
}

export const loginUser =
  async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response =await apiClient.post<AuthResponse>('auth/login', {
      username,
      password,
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {

    const response = error.response.data;

    console.log(response);
    // Check if it's a validation error with messages
    if (response?.data && typeof response.data === 'object') {
      // Flatten all error messages into a single array
      const errors = Object.values(response.data).flat();

      // Combine them into a single string (optional)
      const message = errors.join('\n');

      throw new Error(message);
    }

    if (response?.message) {
      throw new Error(response.message);
    }
    throw new Error('Network error, please check your connection.');

  }
}