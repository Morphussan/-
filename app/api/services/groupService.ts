import { api } from '../apiConfig';
import { ApiResponse, Group } from '../types';

/**
 * Service for group-related operations
 */
const groupService = {
  /**
   * Get all groups
   * @returns Promise with list of groups
   */
  getAllGroups: async (): Promise<ApiResponse<Group[]>> => {
    return api.get<ApiResponse<Group[]>>('/groups/list');
  },
  
  /**
   * Get groups filtered by discipline
   * @param discipline Discipline name to filter by
   * @returns Promise with filtered list of groups
   */
  getGroupsByDiscipline: async (discipline: string): Promise<ApiResponse<Group[]>> => {
    return api.get<ApiResponse<Group[]>>(`/groups/list?discipline=${encodeURIComponent(discipline)}`);
  }
};

export default groupService; 