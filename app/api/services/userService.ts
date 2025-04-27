import ApiService from './apiService';
import { ApiResponse, UserData } from '../types';
import { api } from '../apiConfig';

// User Interface for stronger typing
interface User extends UserData {
  id: number | string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// DTO interfaces for create/update operations
interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface UpdateUserDTO {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

// User service extending the generic API service
class UserService extends ApiService<User, CreateUserDTO, UpdateUserDTO> {
  private endpoint: string;

  constructor() {
    super('/users');
    this.endpoint = '/users';
  }

  // Example of a specialized method
  async getUserProfile(userId: string | number): Promise<ApiResponse<User>> {
    return this.customGet<User>(`/${userId}/profile`);
  }

  // Example of uploading user avatar
  async uploadAvatar(userId: string | number, file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    // Here we're using a direct call to fetch since we're handling FormData
    const response = await fetch(`http://localhost:8080/api${this.endpoint}/${userId}/avatar`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    const data = await response.json();
    return data;
  }

  // Example of a specialized search method
  async searchUsers(query: string): Promise<ApiResponse<User[]>> {
    return this.customGet<User[]>(`/search?q=${encodeURIComponent(query)}`);
  }
}

// Create and export an instance of the service
const userService = new UserService();
export default userService; 