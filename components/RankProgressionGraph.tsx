import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardApi } from '../services/api';
import { RankHistoryItem } from '../types';

interface Props {
  entryId: number;
}

export const RankProgressionGraph: React.FC<Props> = ({ entryId }) => {
  const [history, setHistory] = useState<RankHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await dashboardApi.getRankProgression(entryId);
        const rawData = response.data;
        
        // Transform parallel arrays to object array
        const transformed: RankHistoryItem[] = rawData.gameweeks.map((gw, idx) => ({
            gameweek: gw,
            rank: rawData.overall_rank[idx],
            event: gw
        }));
        
        setHistory(transformed);
      } catch (e) {
        console.error("Failed to load rank history", e);
      } finally {
        setLoading(false);
      }
    };
    
    if (entryId) fetchRank();
  }, [entryId]);

  if (loading) return <div className="h-64 flex items-center justify-center font-mono animate-pulse">LOADING ANALYTICS MODULE...</div>;

  return (
    <div className="w-full h-[300px] font-mono text-xs bg-[#DADAD3] p-2 border-2 border-[#1D1D1B]">
      <div className="mb-4 font-bold uppercase border-b-2 border-[#1D1D1B] pb-1">Overall Rank Progression</div>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#A0A09E" />
          <XAxis dataKey="gameweek" stroke="#1D1D1B" tick={{fill: '#1D1D1B'}} />
          <YAxis reversed stroke="#1D1D1B" tick={{fill: '#1D1D1B'}} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#DADAD3', border: '2px solid #1D1D1B', borderRadius: 0, boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}
            itemStyle={{ color: '#1D1D1B', fontWeight: 'bold' }}
            formatter={(value: number) => [value.toLocaleString(), 'Rank']}
            labelFormatter={(label) => `GW ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="rank" 
            stroke="#1CB59F" 
            strokeWidth={3} 
            dot={{ stroke: '#1D1D1B', strokeWidth: 2, r: 4, fill: '#FFFFFF' }} 
            activeDot={{ r: 6, stroke: '#1D1D1B', strokeWidth: 2, fill: '#FEE242' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};