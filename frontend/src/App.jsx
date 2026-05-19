import { useState } from 'react';
import StartPage from './pages/StartPage.jsx';
import ExperimentPage from './pages/ExperimentPage.jsx';
import FinishPage from './pages/FinishPage.jsx';

function App() {
  const [page, setPage] = useState('start');
  const [userId, setUserId] = useState('');

  const handleStart = (nextUserId) => {
    setUserId(nextUserId);
    setPage('experiment');
  };

  const handleFinish = () => {
    setPage('finish');
  };

  return (
    <main className="app-shell">
      {page === 'start' && <StartPage onStart={handleStart} />}
      {page === 'experiment' && (
        <ExperimentPage userId={userId} onFinish={handleFinish} />
      )}
      {page === 'finish' && <FinishPage userId={userId} />}
    </main>
  );
}

export default App;
