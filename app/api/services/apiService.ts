import { api } from '../apiConfig';
import { ApiResponse, PaginatedResponse, PaginationParams, FilterOptions, SortOptions } from '../types';

// Generic API service for CRUD operations
class ApiService<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  }

  // Get all items (with optional pagination, filtering, and sorting)
  async getAll(
    params?: PaginationParams & FilterOptions & { sort?: SortOptions }
  ): Promise<PaginatedResponse<T> | ApiResponse<T[]>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'sort' && typeof value === 'object') {
            const sortValue = value as SortOptions;
            queryParams.append('sortBy', sortValue.field);
            queryParams.append('sortDirection', sortValue.direction);
          } else {
            queryParams.append(key, String(value));
          }
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `${this.basePath}${query ? `?${query}` : ''}`;
    
    return api.get<PaginatedResponse<T> | ApiResponse<T[]>>(endpoint);
  }

  // Get item by ID
  async getById(id: string | number): Promise<ApiResponse<T>> {
    return api.get<ApiResponse<T>>(`${this.basePath}/${id}`);
  }

  // Create new item
  async create(data: CreateDTO): Promise<ApiResponse<T>> {
    return api.post<ApiResponse<T>>(this.basePath, data);
  }

  // Update existing item
  async update(id: string | number, data: UpdateDTO): Promise<ApiResponse<T>> {
    return api.put<ApiResponse<T>>(`${this.basePath}/${id}`, data);
  }

  // Partial update of an item
  async patch(id: string | number, data: Partial<UpdateDTO>): Promise<ApiResponse<T>> {
    return api.patch<ApiResponse<T>>(`${this.basePath}/${id}`, data);
  }

  // Delete an item
  async delete(id: string | number): Promise<ApiResponse<null>> {
    return api.delete<ApiResponse<null>>(`${this.basePath}/${id}`);
  }

  // Custom GET request within this service's base path
  async customGet<R>(endpoint: string): Promise<ApiResponse<R>> {
    const fullEndpoint = `${this.basePath}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    return api.get<ApiResponse<R>>(fullEndpoint);
  }

  // Custom POST request within this service's base path
  async customPost<R>(endpoint: string, data: any): Promise<ApiResponse<R>> {
    const fullEndpoint = `${this.basePath}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    return api.post<ApiResponse<R>>(fullEndpoint, data);
  }
}

export default ApiService; 