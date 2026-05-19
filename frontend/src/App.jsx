import { useEffect, useLayoutEffect, useState } from 'react';
import StartPage from './pages/StartPage.jsx';
import ExperimentPage from './pages/ExperimentPage.jsx';
import FinishPage from './pages/FinishPage.jsx';

const scrollToPageTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
};

function App() {
  const [page, setPage] = useState('start');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    scrollToPageTop();
  }, [page]);

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
