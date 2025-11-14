import axios from 'axios';
import authStore from "@/store/auth-store.ts";

const apiClient = axios.create({
  baseURL: 'https://expense-tracker-app.test/api/v1/',
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = authStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
)

export default apiClient;