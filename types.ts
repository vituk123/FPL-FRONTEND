
export interface StandardResponse<T> {
  data: T;
  meta: Record<string, any>;
  errors: any;
}

export interface EntryInfo {
  entry_id: number;
  manager_name: string;
  team_name: string;
  player_first_name: string;
  player_last_name: string;
}

export interface GameweekInfo {
  gameweek: number;
  is_current: boolean;
  is_finished: boolean;
  is_next: boolean;
}

export interface PlayerBreakdown {
  id: number;
  name: string;
  team: string;
  team_id: number;
  opponent: string;
  position: number;
  points: number;
  base_points: number;
  minutes: number;
  status: string;
  ownership: string;
  is_captain: boolean;
  is_vice: boolean;
  is_vice_captain: boolean;
  element_type: number;
  photo?: string;
}

export interface LivePoints {
  total: number;
  starting_xi: number;
  bench: number;
  captain: number;
  vice_captain: number;
  bench_boost_active: boolean;
}

export interface TeamSummary {
  manager_name: string;
  total_points: number;
  gw_points: number;
  gw_transfers: number;
  free_transfers: number;
  chips_used: string;
  current_chip: string;
  bank: number;
  total_value: number;
  squad_value: number;
  live_rank: number;
  gw_rank: number;
}

export interface RankProjection {
  current_rank: number;
  projected_rank: number;
  rank_change: number;
}

export interface LiveGameweekData {
  entry_id: number;
  gameweek: number;
  live_points: LivePoints;
  player_breakdown: PlayerBreakdown[];
  team_summary: TeamSummary;
  rank_projection: RankProjection;
}

export interface RankProgressionData {
  gameweeks: number[];
  overall_rank: number[];
  mini_leagues: any[];
}

export interface RankHistoryItem {
  gameweek: number;
  rank: number;
}

// --- ML ENGINE TYPES ---

export interface MLPrediction {
  player_id: number;
  predicted_ev: number;
  gw: number;
  model_version: string;
  confidence_score: number;
  // Optional name if backend enriches it, otherwise we map it
  name?: string; 
  team?: string;
}

export interface TransferPlayer {
  id: number;
  name: string;
}

export interface TransferRecommendation {
  players_out: TransferPlayer[];
  players_in: TransferPlayer[];
  num_transfers: number;
  net_ev_gain: number;
  cost: number;
  bank_after: number;
}

export interface RecommendationData {
  entry_id: number;
  gameweek: number;
  recommendations: TransferRecommendation[];
  forced_transfers: number;
  forced_players: any[];
  free_transfers: number;
  bank: number;
}
