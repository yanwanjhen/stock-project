import { decisionOptions, reasonOptions } from '../data/tasks.js';

function DecisionButtons({
  decision,
  reason,
  onDecisionChange,
  onReasonChange,
  onSubmit,
  isSubmitting
}) {
  const canSubmit = decision && reason && !isSubmitting;

  return (
    <section className="decision-section">
      <div>
        <p className="section-label">你的最終決策</p>
        <div className="choice-grid">
          {decisionOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`choice-button ${decision === option ? 'selected' : ''}`}
              onClick={() => onDecisionChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="section-label">你的主要決策理由</p>
        <div className="reason-grid">
          {reasonOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`reason-button ${reason === option ? 'selected' : ''}`}
              onClick={() => onReasonChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="primary-button submit-button"
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        {isSubmitting ? '送出中...' : '送出此題'}
      </button>
    </section>
  );
}

export default DecisionButtons;
