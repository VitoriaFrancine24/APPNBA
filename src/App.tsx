import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Layout from './components/Layout';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Matches from './pages/Matches';
import PlayerDetail from './pages/PlayerDetail';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import HomePage from './app/page';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hoopvision-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/players/:id" element={<PlayerDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
