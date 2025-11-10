import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://expense-tracker-app.test/api/v1/',
});

export default apiClient;