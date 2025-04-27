// API Configuration and Utilities
// Установите в true для разработки, false для продакшена
export const DEV_MODE = true;

// Определяем базовый URL в зависимости от режима
const API_BASE_URL = DEV_MODE 
  ? 'http://localhost:8080/api' 
  : '/app/api';

// Interface for HTTP request options
interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

// Error class for API errors
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Generic fetch function with error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestOptions = { method: 'GET' }
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const session = window.localStorage.getItem("session");

  if(options.body && session !== null) {
    options.body["session"] = session;
  }

  const config: RequestInit = {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include',
  };

  try {
    const response = await fetch(url, config);
    
    // Parse JSON response
    const data = await response.json().catch(() => null);
    
    // Handle error responses
    if (!response.ok) {
      throw new ApiError(
        data?.message || `API error: ${response.status}`,
        response.status,
        data
      );
    }
    
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors
    throw new ApiError(
      (error as Error).message || 'Network error',
      0
    );
  }
}

// Convenience methods for different HTTP methods
export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) => 
    fetchApi<T>(endpoint, { method: 'GET', headers }),
    
  post: <T>(endpoint: string, body: any, headers?: Record<string, string>) => 
    fetchApi<T>(endpoint, { method: 'POST', body, headers }),
    
  put: <T>(endpoint: string, body: any, headers?: Record<string, string>) => 
    fetchApi<T>(endpoint, { method: 'PUT', body, headers }),
    
  patch: <T>(endpoint: string, body: any, headers?: Record<string, string>) => 
    fetchApi<T>(endpoint, { method: 'PATCH', body, headers }),
    
  delete: <T>(endpoint: string, headers?: Record<string, string>) => 
    fetchApi<T>(endpoint, { method: 'DELETE', headers }),
}; 