import axios from 'axios';
import { 
  StandardResponse, 
  EntryInfo, 
  GameweekInfo, 
  LiveGameweekData, 
  RankProgressionData,
  MLPrediction,
  RecommendationData
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Fallback default

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Interceptor to extract data
api.interceptors.response.use(
  (response) => {
    return response.data; // Extracts { data: ..., meta: ... }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const entryApi = {
  getEntryInfo: async (entryId: number): Promise<StandardResponse<EntryInfo>> => {
    const response = await api.get<any, StandardResponse<EntryInfo>>(`/entry/${entryId}/info`);
    return response;
  },
};

export const liveApi = {
  getGameweek: async (gameweek: number, entryId: number): Promise<StandardResponse<LiveGameweekData>> => {
    const response = await api.get<any, StandardResponse<LiveGameweekData>>(`/live/gameweek/${gameweek}?entry_id=${entryId}`);
    return response;
  },
  getCurrentGameweek: async (): Promise<StandardResponse<GameweekInfo>> => {
    const response = await api.get<any, StandardResponse<GameweekInfo>>(`/gameweek/current`);
    return response;
  }
};

export const dashboardApi = {
  getRankProgression: async (entryId: number, season?: number): Promise<StandardResponse<RankProgressionData>> => {
    const url = season 
      ? `/dashboard/team/rank-progression?entry_id=${entryId}&season=${season}`
      : `/dashboard/team/rank-progression?entry_id=${entryId}`;
    const response = await api.get<any, StandardResponse<RankProgressionData>>(url);
    return response;
  }
};

export const mlApi = {
  getPredictions: async (gameweek: number, entryId?: number): Promise<StandardResponse<{ predictions: MLPrediction[] }>> => {
    let url = `/ml/predictions?gameweek=${gameweek}`;
    if (entryId) url += `&entry_id=${entryId}`;
    const response = await api.get<any, StandardResponse<{ predictions: MLPrediction[] }>>(url);
    return response;
  },
  generatePredictions: async (gameweek: number): Promise<StandardResponse<any>> => {
    return await api.post(`/ml/predictions/generate?gameweek=${gameweek}`);
  }
};

export const recommendationsApi = {
  getTransfers: async (entryId: number, gameweek: number, maxTransfers: number = 2): Promise<StandardResponse<RecommendationData>> => {
    const response = await api.get<any, StandardResponse<RecommendationData>>(
      `/recommendations/transfers?entry_id=${entryId}&gameweek=${gameweek}&max_transfers=${maxTransfers}`
    );
    return response;
  }
};

export const utilityApi = {
  getHealth: async () => {
    return api.get('/health');
  }
};