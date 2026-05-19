import PredictionPanel from './PredictionPanel.jsx';
import ExplanationPanel from './ExplanationPanel.jsx';
import DecisionButtons from './DecisionButtons.jsx';
import { marketLabels } from '../data/tasks.js';

function TaskCard({
  task,
  decision,
  reason,
  openedState,
  onOpenSection,
  onDecisionChange,
  onReasonChange,
  onSubmit,
  isSubmitting
}) {
  const visibleMarketKeys = ['currentPrice', 'maxDrawdown'];

  return (
    <article className="task-card">
      <section className="story-section">
        <div className="story-heading">
          <p className="section-label">任務故事</p>
          <h2>{task.storyTitle}</h2>
          <p className="stock-line">
            {task.stockName} <span>{task.stockCode}</span>
          </p>
        </div>
        <div className="role-goal-grid">
          <div>
            <span>你的角色</span>
            <strong>{task.storyBackground[0] || task.userRole}</strong>
          </div>
          <div>
            <span>你的目標</span>
            <strong>{task.decisionGoal}</strong>
          </div>
        </div>
      </section>

      <section className="market-section">
        <p className="section-label">市場資訊摘要</p>
        <div className="market-grid">
          {visibleMarketKeys
            .filter((key) => task.marketInfo[key])
            .map((key) => (
              <div className="market-item" key={key}>
                <span>{marketLabels[key] || key}</span>
                <strong>{task.marketInfo[key]}</strong>
              </div>
            ))}
        </div>
        <div className="news-context">
          <span>近期新聞脈絡</span>
          <p>{task.recentNewsContext}</p>
        </div>
      </section>

      <PredictionPanel task={task} />

      <ExplanationPanel
        task={task}
        openedState={openedState}
        onOpenSection={onOpenSection}
      />

      <DecisionButtons
        decision={decision}
        reason={reason}
        onDecisionChange={onDecisionChange}
        onReasonChange={onReasonChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </article>
  );
}

export default TaskCard;
