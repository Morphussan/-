// Common response format
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination parameters for requests
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Pagination metadata in responses
export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

// Paginated response format
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

// Basic sorting options
export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Filtering options (generic - can be extended for specific endpoints)
export interface FilterOptions {
  [key: string]: string | number | boolean | null | undefined;
}

// Authentication related types
export interface LoginCredentials {
  login: string;
  password: string;
}

export interface UserData {
  id: string | number;
  username: string;
  email: string;
  role?: string;
  [key: string]: any; // For additional user properties
}

export interface AuthResponse {
  user: UserData;
  token?: string;
}

// Error response format
export interface ErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Dashboard metadata types
export interface StorageUsage {
  totalStorage: number;
  freeStorage: number;
}

export interface MetaData {
  totalUsers: number;
  cpuUsage: number;
  ramUsage: number;
  storageUsage: StorageUsage;
}

// Group type
export interface Group {
  id: string; // UUID as string
  name: string;
  discipline: string;
}

// Schedule Lesson type (расписание занятий)
export interface ScheduleLesson {
  id: number;
  group_id: number;
  subject: string;
  teacher: string;
  day: string;
  time: string; // В формате '09:00-10:00'
}


// Request payload for getting lessons by group
export interface GetLessonsRequest {
  session?: any; // Placeholder for session data
  groupName?: string; // Name of the group to get lessons for
  groupId?: string; // ID of the group to get lessons for
} 

