import React, { useEffect, useState, useCallback } from 'react';
import { liveApi } from '../services/api';
import { LiveGameweekData, PlayerBreakdown } from '../types';
import { IconUser, IconChart, IconFPL, IconStar, IconBattery } from './Icons';
import { DecryptedText } from './animations/DecryptedText';
import { ShinyText } from './animations/ShinyText';

interface Props {
  entryId: number;
  gameweek: number;
}

export const LiveGameweekTracker: React.FC<Props> = ({ entryId, gameweek }) => {
  const [data, setData] = useState<LiveGameweekData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (isPaused) return;
    try {
      const response = await liveApi.getGameweek(gameweek, entryId);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch live data");
    } finally {
      setLoading(false);
    }
  }, [gameweek, entryId, isPaused]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // 30s polling
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-8 h-8 border-4 border-[#1D1D1B] border-t-transparent animate-spin rounded-none"></div>
        <p className="font-mono text-sm">INITIALIZING DATA LINK...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-[#EB3E49] text-white p-4 border-2 border-[#1D1D1B] font-bold">
        ERROR: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center bg-[#C1C1BF] p-2 border-2 border-[#1D1D1B]">
        <div className="font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 border-[#1D1D1B] ${isPaused ? 'bg-[#EB3E49]' : 'bg-[#1CB59F] animate-pulse'}`}></div>
            <ShinyText text={`LIVE FEED // GW ${gameweek}`} className="text-[#1D1D1B] text-opacity-80" />
        </div>
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="text-xs font-bold px-2 py-1 border-2 border-[#1D1D1B] bg-[#DADAD3] hover:bg-white hover:translate-y-[-1px] hover:shadow-[2px_2px_0_#1D1D1B] transition-all flex items-center gap-1"
        >
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox 
            label="Total Points" 
            value={data?.live_points.total} 
            color="bg-[#50C1EC]" 
            icon={<IconFPL size={24} />}
        />
        <StatBox 
            label="Live Rank" 
            value={data?.team_summary.live_rank.toLocaleString()} 
            icon={<IconChart size={24} />}
        />
        <StatBox 
            label="GW Rank" 
            value={data?.team_summary.gw_rank.toLocaleString()} 
            icon={<IconStar size={24} />}
        />
        <StatBox 
            label="Rank Change" 
            value={data?.rank_projection.rank_change} 
            isChange 
            color={data && data.rank_projection.rank_change > 0 ? 'bg-[#1CB59F]' : 'bg-[#EB3E49]'}
            icon={<IconUser size={24} />}
        />
      </div>

      {/* Pitch / List View */}
      <div className="border-2 border-[#1D1D1B] bg-white">
        <div className="bg-[#1D1D1B] text-[#DADAD3] p-2 font-mono text-xs flex justify-between uppercase">
            <span className="flex items-center gap-2"><IconUser size={14} className="text-[#DADAD3]" /> Player Breakdown</span>
            <span>XI Points: <DecryptedText text={data?.live_points.starting_xi || 0} /></span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-[#DADAD3] text-[#1D1D1B] font-bold border-b-2 border-[#1D1D1B]">
                    <tr>
                        <th className="p-3 border-r-2 border-[#1D1D1B] w-8">Pos</th>
                        <th className="p-3 border-r-2 border-[#1D1D1B]">Player</th>
                        <th className="p-3 border-r-2 border-[#1D1D1B]">Match</th>
                        <th className="p-3 text-right">Pts</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-[#1D1D1B]">
                    {data?.player_breakdown.map((player) => (
                        <PlayerRow key={player.id} player={player} />
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value?: number | string; color?: string; isChange?: boolean; icon?: React.ReactNode }> = ({ label, value, color = 'bg-[#DADAD3]', isChange, icon }) => {
    const displayValue = isChange && typeof value === 'number' && value > 0 ? `+${value}` : value;
    const finalValue = displayValue ?? '-';

    return (
        <div className={`${color} border-2 border-[#1D1D1B] p-3 flex flex-col items-start justify-between min-h-[80px] hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(29,30,28,0.26)] transition-all`}>
            <div className="w-full flex justify-between items-start opacity-70">
                <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                {icon && <div className="scale-75 origin-top-right">{icon}</div>}
            </div>
            <span className="text-2xl font-bold font-mono tracking-tighter mt-1">
                <DecryptedText text={finalValue} animateOnHover />
            </span>
        </div>
    );
};

const PlayerRow: React.FC<{ player: PlayerBreakdown }> = ({ player }) => {
    const isBench = player.position > 11;
    const rowClass = isBench ? "bg-[#F3F3F2]" : "bg-white";
    
    return (
        <tr className={`${rowClass} hover:bg-[#50C1EC] transition-colors group`}>
            <td className="p-3 border-r-2 border-[#1D1D1B] font-mono text-xs font-bold text-center">
                {player.position}
            </td>
            <td className="p-3 border-r-2 border-[#1D1D1B]">
                <div className="flex flex-col">
                    <span className="font-bold flex items-center gap-2">
                        {player.name} 
                        {player.is_captain && <span className="bg-[#1D1D1B] text-[#DADAD3] text-[10px] px-1 rounded-none">C</span>}
                        {player.is_vice_captain && <span className="bg-[#C1C1BF] text-[#1D1D1B] text-[10px] px-1 rounded-none">V</span>}
                    </span>
                    <span className="text-[10px] uppercase opacity-70 group-hover:text-[#1D1D1B]">{player.team}</span>
                </div>
            </td>
            <td className="p-3 border-r-2 border-[#1D1D1B] font-mono text-xs">
                {player.opponent}
                <div className="text-[10px] opacity-70">{player.status}</div>
            </td>
            <td className="p-3 text-right font-bold text-lg font-mono">
                {player.points}
            </td>
        </tr>
    );
};