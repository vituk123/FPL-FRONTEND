import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MacMenuBar } from './components/MacMenuBar';
import { AppProvider } from './context/AppContext';
import { Landing } from './pages/Landing';
import { TeamDashboard } from './pages/TeamDashboard';
import { Optimization } from './pages/Optimization';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen pt-10">
      <MacMenuBar />
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Optimization Route before wildcard fallback */}
            <Route path="/:gameweek/team/:teamId/optimize" element={<Optimization />} />
            <Route path="/:gameweek/team/:teamId" element={<TeamDashboard />} />
            <Route path="/:gameweek/team/:teamId/*" element={<TeamDashboard />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;