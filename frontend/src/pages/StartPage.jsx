import { useState } from 'react';
import { logEvent } from '../api/experimentApi.js';

const allowedUserIds = new Set([
  'U002',
  'U003',
  'U005',
  'U007',
  'U011',
  'U013',
  'U017',
  'U019',
  'U023',
  'U029',
  'U031',
  'U037',
  'U041',
  'U043',
  'U047',
  'U053',
  'U059',
  'U061',
  'U067',
  'U071',
  'U073',
  'U079',
  'U083',
  'U089',
  'U097'
]);

function StartPage({ onStart }) {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedUserId = userId.trim().toUpperCase();

    if (!trimmedUserId) {
      setError('請輸入使用者代號。');
      return;
    }

    if (!allowedUserIds.has(trimmedUserId)) {
      setError('請輸入研究者提供的質數代號，範圍為 U002～U097。');
      return;
    }

    setIsStarting(true);
    setError('');

    try {
      await logEvent({
        user_id: trimmedUserId,
        task_id: '',
        story_title: '',
        scenario_type: '',
        event_type: 'START_EXPERIMENT',
        event_target: '我已了解，開始實驗',
        timestamp: new Date().toISOString(),
        elapsed_time_ms: 0,
        prediction: '',
        ai_suggestion: '',
        confidence: ''
      });
    } catch (apiError) {
      setError('開始事件紀錄失敗，仍可繼續實驗。');
    } finally {
      setIsStarting(false);
      onStart(trimmedUserId);
    }
  };

  return (
    <section className="page-container start-page">
      <div className="intro-card">
        <p className="system-label">期末專題網站</p>
        <h1>台股量化預測與新聞情緒之雙軌決策輔助系統</h1>
        <p className="disclaimer-copy">
          本系統為課堂研究與模擬實驗，不構成任何投資建議。
        </p>
        <div className="intro-section">
          <h2>任務介紹與操作流程說明</h2>
          <p>
            實驗流程約 20 分鐘，包含閱讀任務說明、完成 5 個投資情境任務、每題可選擇查看解釋資訊，最後做出投資決策與決策理由。
          </p>
          <p>
            操作過程都會被系統記錄為研究資料，資料只用於分析介面互動行為，請放心操作。
          </p>
        </div>
        <div className="flow-card">
          <h2>實驗流程</h2>
          <p>
            你將依序完成 5 個模擬投資任務。每個任務都會先給你一段投資故事背景與市場資訊，接著顯示模型預測結果與信心分數。你可以自行決定是否點開模型解釋、風險提示與驗證建議。最後，你需要選擇自己的投資決策，並選擇一個最主要的決策理由。
          </p>
        </div>
        <div className="terms-grid" aria-label="介面名詞說明">
          <div>
            <strong>AI 預測與信心分數</strong>
            <span>系統根據資料推測明日可能走勢以及把握程度。</span>
          </div>
          <div>
            <strong>模型解釋</strong>
            <span>模型的判斷依據。</span>
          </div>
          <div>
            <strong>風險提示</strong>
            <span>此預測可能出錯的地方。</span>
          </div>
          <div>
            <strong>驗證建議</strong>
            <span>使用者可以再檢查哪些資訊。</span>
          </div>
        </div>
        <form className="start-form" onSubmit={handleSubmit}>
          <label htmlFor="user-id">使用者代號</label>
          <input
            id="user-id"
            value={userId}
            onChange={(event) => setUserId(event.target.value.toUpperCase())}
            autoComplete="off"
          />
          <p className="input-hint">
            請輸入研究者提供的代號。
          </p>
          {error && <p className="error-message">{error}</p>}
          <button className="primary-button" type="submit" disabled={isStarting}>
            {isStarting ? '紀錄中...' : '我已了解，開始實驗'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default StartPage;
