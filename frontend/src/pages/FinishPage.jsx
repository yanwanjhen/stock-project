import { API_BASE_URL } from '../api/experimentApi.js';

function FinishPage({ userId }) {
  return (
    <section className="page-container finish-page">
      <div className="finish-card">
        <p className="system-label">使用者代號：{userId}</p>
        <h1>實驗完成，感謝參與</h1>
        <p>
          本次模擬投資決策任務已完成，請點擊輸出結果紀錄。
        </p>
        <div className="download-actions">
          <a className="secondary-button" href={`${API_BASE_URL}/api/download/events`}>
            下載 events.csv
          </a>
          <a
            className="secondary-button"
            href={`${API_BASE_URL}/api/download/task-results`}
          >
            下載 task_results.csv
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinishPage;
