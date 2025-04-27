// Export API config and fetch utilities
export { api, ApiError, fetchApi } from './apiConfig';

// Export API types
export * from './types';

// Export API services
export { default as authService } from './services/authService';
export { default as ApiService } from './services/apiService';
export { default as userService } from './services/userService';
export { default as metaService } from './services/metaService';
export { default as groupService } from './services/groupService';
export { default as lessonService } from './services/lessonService';

// Create and export specialized API service instances as needed
// Example:
// import ApiService from './services/apiService';
// interface User {...}
// export const userService = new ApiService<User>('/users');

// Helper function to create new API services
import ApiServiceClass from './services/apiService';
export function createApiService<T, C = Partial<T>, U = Partial<T>>(endpoint: string) {
  return new ApiServiceClass<T, C, U>(endpoint);
} 