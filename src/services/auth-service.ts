import apiClient from "@/services/apiClient.ts";
import type {User} from "@/user.ts";

interface RegisterNewUserResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    user: User
  }
}

interface LoginResponse {
  user: User
  access_token: string;
}

export const registerNewUser =
  async (username: string, email: string, password: string): Promise<RegisterNewUserResponse> => {
  try {
    const response =
      await apiClient.post<RegisterNewUserResponse>('auth/register', {
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
  async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response =await apiClient.post<LoginResponse>('auth/login', {
      username,
      password,
    })
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