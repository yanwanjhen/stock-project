function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="progress-block" aria-label={`任務進度 ${current} / ${total}`}>
      <div className="progress-meta">
        <span>任務進度</span>
        <strong>{current} / {total}</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
