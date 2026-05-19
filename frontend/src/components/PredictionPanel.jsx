function PredictionPanel({ task }) {
  return (
    <section className="prediction-panel">
      <div>
        <p className="section-label">AI 預測結果</p>
        <h3>{task.prediction}</h3>
        <p>
          AI 投資建議：<strong>{task.aiSuggestion}</strong>
        </p>
      </div>
      <div className="confidence-box" aria-label={`信心分數 ${task.confidence}%`}>
        <span>信心分數</span>
        <strong>{task.confidence}%</strong>
      </div>
    </section>
  );
}

export default PredictionPanel;
