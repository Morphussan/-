import { api } from '../apiConfig';
import { ApiResponse, AuthResponse, LoginCredentials, UserData } from '../types';

// Authentication service for handling login, registration, etc.
const authService = {
  // Login with username/email and password
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return api.post<ApiResponse<AuthResponse>>('/authenticate', credentials);
  }
};

export default authService; 