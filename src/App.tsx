import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Layout from './components/Layout';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Players from './pages/Players';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import PlayerDetail from './pages/PlayerDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hoopvision-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerDetail />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
