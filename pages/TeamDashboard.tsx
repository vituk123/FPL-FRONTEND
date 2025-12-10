import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DesktopWindow } from '../components/DesktopWindow';
import { LiveGameweekTracker } from '../components/LiveGameweekTracker';
import { RankProgressionGraph } from '../components/RankProgressionGraph';
import { DesktopIcon } from '../components/DesktopIcon';
import { useAppContext } from '../context/AppContext';
import { IconChart, IconFolder, IconHome, IconTransfer } from '../components/Icons';
import { Magnet } from '../components/animations/Magnet';

export const TeamDashboard: React.FC = () => {
  const { gameweek, teamId } = useParams<{ gameweek: string; teamId: string }>();
  const navigate = useNavigate();
  const { setEntryId, entryId: contextEntryId } = useAppContext();

  const gwNumber = parseInt(gameweek || '1', 10);
  const idNumber = parseInt(teamId || '0', 10);

  useEffect(() => {
    // Sync URL params to context
    if (idNumber && idNumber !== contextEntryId) {
      setEntryId(idNumber);
    }
  }, [idNumber, contextEntryId, setEntryId]);

  if (!idNumber) return null;

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto pb-20">
      
      {/* Desktop Navigation / Dock */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 border-b-2 border-[#1D1D1B] border-dashed">
        <Magnet padding={5}>
            <DesktopIcon 
                label="Dashboard" 
                icon={<IconHome size={32} strokeWidth={2} />} 
                isActive
                onClick={() => navigate(`/${gwNumber}/team/${idNumber}`)}
            />
        </Magnet>
        <Magnet padding={5}>
            <DesktopIcon 
                label="Live Data" 
                icon={<IconFolder size={32} strokeWidth={2} />} 
            />
        </Magnet>
        <Magnet padding={5}>
            <DesktopIcon 
                label="History" 
                icon={<IconChart size={32} strokeWidth={2} />} 
            />
        </Magnet>
        <Magnet padding={5}>
            <DesktopIcon 
                label="Transfers" 
                icon={<IconTransfer size={32} strokeWidth={2} />} 
                onClick={() => navigate(`/${gwNumber}/team/${idNumber}/optimize`)}
            />
        </Magnet>
      </div>

      {/* Top Section: Live Tracker */}
      <DesktopWindow title={`Live Command Center // GW${gwNumber}`} className="w-full animate-fade-in-up">
        <LiveGameweekTracker entryId={idNumber} gameweek={gwNumber} />
      </DesktopWindow>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Rank Graph */}
        <DesktopWindow title="Performance Metrics" className="w-full h-full min-h-[400px]">
           <RankProgressionGraph entryId={idNumber} />
        </DesktopWindow>

        {/* Transfer Promo */}
        <DesktopWindow title="Transfer Protocol" className="w-full h-full min-h-[400px]">
           <div className="flex flex-col items-center justify-center h-full text-center space-y-6 p-8">
             <div className="relative">
                <IconTransfer size={80} strokeWidth={1} className="text-[#1D1D1B]" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-[#1CB59F] animate-pulse"></div>
             </div>
             
             <div className="space-y-2">
                <h3 className="font-mono font-bold text-xl">ML ENGINE ONLINE</h3>
                <p className="text-sm max-w-xs mx-auto opacity-70">
                    Optimization algorithms are ready. v4.6 model loaded.
                </p>
             </div>

             <button 
                onClick={() => navigate(`/${gwNumber}/team/${idNumber}/optimize`)}
                className="bg-[#1D1D1B] text-[#DADAD3] font-bold px-6 py-3 hover:bg-[#50C1EC] hover:text-[#1D1D1B] hover:shadow-[4px_4px_0_rgba(29,30,28,0.2)] transition-all uppercase tracking-wider text-sm"
             >
                Access Optimizer
             </button>
           </div>
        </DesktopWindow>
      </div>
    </div>
  );
};