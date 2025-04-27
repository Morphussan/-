import { api } from '../apiConfig';
import { ApiResponse, MetaData } from '../types';

/**
 * Service for dashboard metadata operations
 */
const metaService = {
  /**
   * Get system metadata for dashboard
   * @param session Optional session data, can be left empty for now
   * @returns Promise with dashboard metadata
   */
  getMetaData: async (session: string = ""): Promise<ApiResponse<MetaData>> => {
    return api.post<ApiResponse<MetaData>>('/meta', {
      session: session
    });
  }
};

export default metaService; 