function FinishPage({ userId }) {
  return (
    <section className="page-container finish-page">
      <div className="finish-card">
        <p className="system-label">使用者代號：{userId}</p>
        <h1>實驗完成，感謝參與</h1>
        <p>
          本次模擬投資決策任務已完成，請通知研究者你已完成實驗。
        </p>
      </div>
    </section>
  );
}

export default FinishPage;
