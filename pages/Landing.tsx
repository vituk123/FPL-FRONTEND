import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DesktopWindow } from '../components/DesktopWindow';
import { GlitchLogo } from '../components/animations/GlitchLogo';
import { useAppContext } from '../context/AppContext';
import { entryApi } from '../services/api';

export const Landing: React.FC = () => {
  const [inputEntryId, setInputEntryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setEntryId, currentGameweek } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEntryId) return;

    setLoading(true);
    setError(null);

    try {
      const id = parseInt(inputEntryId, 10);
      if (isNaN(id)) throw new Error("Invalid ID");
      
      // Verify ID exists
      await entryApi.getEntryInfo(id);
      
      setEntryId(id);
      const gw = currentGameweek || 1;
      navigate(`/${gw}/team/${id}`);
    } catch (err) {
      console.error(err);
      setError("Invalid Team ID or API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-40px)] p-4">
      <DesktopWindow title="System Login" className="w-full max-w-md animate-scale-in">
        <div className="flex flex-col items-center space-y-8 p-4">
          
          <div className="py-4">
             <GlitchLogo src="/logo.png" alt="FPL Optimizer" size={120} />
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs font-mono opacity-60">SECURE TERMINAL ACCESS</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-1">
              <label htmlFor="entryId" className="block text-xs font-bold uppercase tracking-wider">
                Manager ID
              </label>
              <input
                id="entryId"
                type="text"
                value={inputEntryId}
                onChange={(e) => setInputEntryId(e.target.value)}
                placeholder="ENTER ID..."
                className="w-full bg-[#DADAD3] border-2 border-[#1D1D1B] p-3 font-mono focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_rgba(29,30,28,0.2)] transition-all placeholder:text-[#1D1D1B]/30"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-[#EB3E49] text-white p-3 text-xs font-mono border-2 border-[#1D1D1B] flex items-center gap-2">
                <span className="text-xl">!</span> 
                <span className="font-bold">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1D1D1B] text-[#DADAD3] font-bold py-4 border-2 border-transparent hover:bg-[#50C1EC] hover:text-[#1D1D1B] hover:border-[#1D1D1B] hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(29,30,28,0.3)] transition-all active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
            </button>
          </form>

          <div className="pt-4 border-t-2 border-[#1D1D1B] border-dashed w-full text-center">
            <p className="text-[10px] font-mono opacity-50">Made by Vitu K</p>
          </div>
        </div>
      </DesktopWindow>
    </div>
  );
};