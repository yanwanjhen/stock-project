const panelItems = [
  {
    key: 'opened_explanation',
    eventType: 'OPEN_EXPLANATION',
    buttonLabel: '查看模型解釋',
    title: '模型解釋',
    contentKey: 'explanation'
  },
  {
    key: 'opened_risk_warning',
    eventType: 'OPEN_RISK_WARNING',
    buttonLabel: '查看風險提示',
    title: '風險提示',
    contentKey: 'riskWarning'
  },
  {
    key: 'opened_verification_hint',
    eventType: 'OPEN_VERIFICATION_HINT',
    buttonLabel: '查看驗證建議',
    title: '驗證建議',
    contentKey: 'verificationHint'
  }
];

function ExplanationPanel({ task, openedState, onOpenSection }) {
  return (
    <section className="explanation-section">
      <p className="section-label">你可以選擇查看的資訊</p>
      <div className="accordion-grid">
        {panelItems.map((item) => {
          const isOpen = openedState[item.key];
          const content = task[item.contentKey];

          return (
            <div className="accordion-item" key={item.key}>
              <button
                type="button"
                className="accordion-button"
                onClick={() =>
                  onOpenSection(item.key, item.eventType, item.buttonLabel)
                }
                aria-expanded={isOpen}
              >
                <span>{item.buttonLabel}</span>
                <span className="accordion-icon">{isOpen ? '已展開' : '展開'}</span>
              </button>
              {isOpen && (
                <div className="accordion-content">
                  <h4>{item.title}</h4>
                  {Array.isArray(content) ? (
                    <ul className="feature-list">
                      {content.map((feature) => (
                        <li key={feature.name || feature}>
                          {typeof feature === 'string' ? (
                            feature
                          ) : (
                            <>
                              <strong>
                                {feature.name}：{feature.value}%
                              </strong>
                              <span>{feature.description}</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{content}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExplanationPanel;
