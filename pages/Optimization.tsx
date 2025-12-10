import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DesktopWindow } from '../components/DesktopWindow';
import { useAppContext } from '../context/AppContext';
import { mlApi, recommendationsApi } from '../services/api';
import { MLPrediction, RecommendationData, TransferRecommendation } from '../types';
import { IconChart, IconTransfer, IconHome, IconFolder } from '../components/Icons';
import { DesktopIcon } from '../components/DesktopIcon';
import { Magnet } from '../components/animations/Magnet';
import { DecryptedText } from '../components/animations/DecryptedText';

export const Optimization: React.FC = () => {
  const { gameweek, teamId } = useParams<{ gameweek: string; teamId: string }>();
  const navigate = useNavigate();
  const { setEntryId, entryId: contextEntryId } = useAppContext();
  
  const gwNumber = parseInt(gameweek || '1', 10);
  const idNumber = parseInt(teamId || '0', 10);

  const [predictions, setPredictions] = useState<MLPrediction[]>([]);
  const [recommendations, setRecommendations] = useState<TransferRecommendation[]>([]);
  const [loadingPreds, setLoadingPreds] = useState(false);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [maxTransfers, setMaxTransfers] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Sync context
  useEffect(() => {
    if (idNumber && idNumber !== contextEntryId) {
      setEntryId(idNumber);
    }
  }, [idNumber, contextEntryId, setEntryId]);

  // Load initial predictions for the team
  useEffect(() => {
    const fetchPredictions = async () => {
      setLoadingPreds(true);
      try {
        // We fetch predictions for next gameweek usually, but using current param for now
        const res = await mlApi.getPredictions(gwNumber, idNumber);
        setPredictions(res.data.predictions || []);
      } catch (e) {
        console.error("Failed to fetch predictions", e);
        // Don't block UI, just log
      } finally {
        setLoadingPreds(false);
      }
    };
    if (idNumber) fetchPredictions();
  }, [gwNumber, idNumber]);

  const handleRunOptimization = async () => {
    setLoadingRecs(true);
    setError(null);
    setRecommendations([]);
    try {
      const res = await recommendationsApi.getTransfers(idNumber, gwNumber, maxTransfers);
      if (res.data.recommendations) {
        setRecommendations(res.data.recommendations);
      }
    } catch (e) {
      console.error(e);
      setError("Optimization failed. Backend ML service might be busy.");
    } finally {
      setLoadingRecs(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto pb-20">
      
      {/* Navigation Dock */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 border-b-2 border-[#1D1D1B] border-dashed">
        <Magnet padding={5}>
            <DesktopIcon 
                label="Dashboard" 
                icon={<IconHome size={32} strokeWidth={2} />} 
                onClick={() => navigate(`/${gwNumber}/team/${idNumber}`)}
            />
        </Magnet>
        <Magnet padding={5}>
            <DesktopIcon 
                label="Optimizer" 
                icon={<IconTransfer size={32} strokeWidth={2} />} 
                isActive
            />
        </Magnet>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Panel: Current Squad EV */}
        <DesktopWindow title="Squad EV Analysis" className="lg:col-span-1 h-full min-h-[500px]">
          <div className="space-y-4">
             <div className="flex justify-between items-center text-xs font-mono font-bold border-b-2 border-[#1D1D1B] pb-2">
                <span>PLAYER ASSET</span>
                <span>EXP. VALUE (xPts)</span>
             </div>
             
             {loadingPreds ? (
                <div className="text-center py-8 font-mono animate-pulse">ANALYZING SQUAD...</div>
             ) : predictions.length === 0 ? (
                <div className="text-center py-8 font-mono opacity-50">NO DATA AVAILABLE</div>
             ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                   {predictions.map((p) => (
                      <div key={p.player_id} className="flex items-center justify-between group cursor-default">
                         <div className="flex flex-col">
                            <span className="font-bold text-sm">ID: {p.player_id}</span>
                            <span className="text-[10px] opacity-60 font-mono">CONF: {p.confidence_score.toFixed(2)}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-[#DADAD3] border border-[#1D1D1B] relative">
                                <div 
                                    className="h-full bg-[#50C1EC]" 
                                    style={{ width: `${Math.min((p.predicted_ev / 10) * 100, 100)}%` }}
                                />
                            </div>
                            <span className="font-mono font-bold w-8 text-right">{p.predicted_ev.toFixed(1)}</span>
                         </div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </DesktopWindow>

        {/* Right Panel: Optimization Controls & Output */}
        <DesktopWindow title="Transfer Optimization Engine v4.6" className="lg:col-span-2 h-full min-h-[500px]">
           <div className="flex flex-col h-full space-y-6">
              
              {/* Controls */}
              <div className="bg-[#C1C1BF] p-4 border-2 border-[#1D1D1B] space-y-4">
                 <div className="flex items-center justify-between">
                    <label className="font-mono font-bold uppercase text-sm">Transfer Budget (Moves):</label>
                    <div className="flex items-center space-x-2">
                       <button 
                         onClick={() => setMaxTransfers(Math.max(1, maxTransfers - 1))}
                         className="w-8 h-8 bg-[#DADAD3] border-2 border-[#1D1D1B] hover:bg-white font-bold"
                       >-</button>
                       <span className="font-mono text-xl w-8 text-center">{maxTransfers}</span>
                       <button 
                         onClick={() => setMaxTransfers(Math.min(15, maxTransfers + 1))}
                         className="w-8 h-8 bg-[#DADAD3] border-2 border-[#1D1D1B] hover:bg-white font-bold"
                       >+</button>
                    </div>
                 </div>
                 
                 <button 
                    onClick={handleRunOptimization}
                    disabled={loadingRecs}
                    className="w-full py-3 bg-[#1D1D1B] text-[#DADAD3] font-bold uppercase tracking-widest border-2 border-transparent hover:bg-[#1CB59F] hover:text-[#1D1D1B] hover:border-[#1D1D1B] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_rgba(29,30,28,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {loadingRecs ? <DecryptedText text="RUNNING SIMULATION..." /> : 'INITIATE OPTIMIZATION'}
                 </button>
              </div>

              {/* Console Output */}
              <div className="flex-1 bg-[#1D1D1B] p-4 font-mono text-xs md:text-sm text-[#DADAD3] overflow-y-auto custom-scrollbar border-2 border-[#DADAD3] shadow-inner min-h-[300px]">
                 {loadingRecs && (
                    <div className="space-y-2 animate-pulse text-[#FEE242]">
                       <p>{'>'} CONNECTING TO ML ENGINE CORE...</p>
                       <p>{'>'} LOADING MODEL v4.6...</p>
                       <p>{'>'} EVALUATING 500+ PLAYER NODES...</p>
                       <p>{'>'} CALCULATING EXPECTED VALUE DELTAS...</p>
                    </div>
                 )}

                 {!loadingRecs && error && (
                    <p className="text-[#EB3E49] font-bold">{'>'} ERROR: {error}</p>
                 )}

                 {!loadingRecs && !error && recommendations.length === 0 && (
                    <div className="text-[#DADAD3]/50">
                       <p>{'>'} SYSTEM READY.</p>
                       <p>{'>'} AWAITING INPUT PARAMETERS.</p>
                    </div>
                 )}

                 {!loadingRecs && recommendations.length > 0 && (
                    <div className="space-y-6">
                       <p className="text-[#1CB59F]">{'>'} OPTIMIZATION COMPLETE. SOLUTION FOUND.</p>
                       
                       {recommendations.map((rec, idx) => (
                          <div key={idx} className="border-l-2 border-[#50C1EC] pl-4 py-2 space-y-2 bg-[#DADAD3]/10">
                             <div className="font-bold text-[#FEE242] mb-2 uppercase">
                                RECOMMENDATION #{idx + 1} (NET GAIN: +{rec.net_ev_gain.toFixed(2)} EV)
                             </div>
                             
                             {rec.players_out.map((pOut, i) => (
                                <div key={`out-${i}`} className="flex items-center gap-2 text-[#EB3E49]">
                                   <span>[SELL]</span>
                                   <span className="font-bold">{pOut.name} (ID: {pOut.id})</span>
                                </div>
                             ))}
                             
                             {rec.players_in.map((pIn, i) => (
                                <div key={`in-${i}`} className="flex items-center gap-2 text-[#1CB59F]">
                                   <span>[BUY] </span>
                                   <span className="font-bold">{pIn.name} (ID: {pIn.id})</span>
                                </div>
                             ))}
                             
                             <div className="mt-2 text-[#DADAD3]/70 pt-2 border-t border-[#DADAD3]/20">
                                <span>Bank After: £{rec.bank_after}m | Cost: {rec.cost} pts</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           </div>
        </DesktopWindow>
      </div>
    </div>
  );
};