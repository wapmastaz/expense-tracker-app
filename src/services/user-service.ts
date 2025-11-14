import type {User} from "@/types/user.ts";
import apiClient from "@/services/apiClient.ts";

interface UserResponse {
  status: boolean;
  data: User;
  message: string;
}

interface defaultApiResponse {
  message: string;
  status: boolean;
}

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<UserResponse>('user/info');
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || 'Failed to fetch user profile.'
      );
    }
    throw new Error('Network error, please try again.');
  }
};

export const logUserOut = async () => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      'user/logout',
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // Extract error message from response
      throw new Error(
        error.response.data.error || 'An unexpected error occurred'
      );
    }
    throw new Error('Network error, please try again');
  }
};

