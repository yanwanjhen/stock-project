import { useEffect, useRef, useState } from 'react';
import TaskCard from '../components/TaskCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { tasks } from '../data/tasks.js';
import { logEvent, saveTaskResult } from '../api/experimentApi.js';

const emptyOpenState = {
  opened_explanation: false,
  opened_features: false,
  opened_risk_warning: false,
  opened_verification_hint: false
};

function ExperimentPage({ userId, onFinish }) {
  const [taskIndex, setTaskIndex] = useState(0);
  const [decision, setDecision] = useState('');
  const [reason, setReason] = useState('');
  const [openedState, setOpenedState] = useState(emptyOpenState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInactivityReminder, setShowInactivityReminder] = useState(false);
  const taskStartTimeRef = useRef(Date.now());
  const lastTaskStartLoggedRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const reminderDismissTimerRef = useRef(null);

  const currentTask = tasks[taskIndex];

  const buildEventPayload = (eventType, eventTarget, elapsedTime = null) => ({
    user_id: userId,
    task_id: currentTask.id,
    story_title: currentTask.storyTitle,
    scenario_type: currentTask.scenarioType,
    event_type: eventType,
    event_target: eventTarget,
    timestamp: new Date().toISOString(),
    elapsed_time_ms:
      elapsedTime === null ? Date.now() - taskStartTimeRef.current : elapsedTime,
    prediction: currentTask.prediction,
    ai_suggestion: currentTask.aiSuggestion,
    confidence: currentTask.confidence
  });

  const safeLogEvent = async (eventType, eventTarget, elapsedTime = null) => {
    try {
      await logEvent(buildEventPayload(eventType, eventTarget, elapsedTime));
      setError('');
    } catch (apiError) {
      setError('事件紀錄送出失敗，請確認後端 API 是否啟動。');
    }
  };

  const resetInactivityReminder = () => {
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }
    if (reminderDismissTimerRef.current) {
      window.clearTimeout(reminderDismissTimerRef.current);
    }

    setShowInactivityReminder(false);
    inactivityTimerRef.current = window.setTimeout(() => {
      setShowInactivityReminder(true);
      reminderDismissTimerRef.current = window.setTimeout(() => {
        setShowInactivityReminder(false);
      }, 7000);
    }, 60000);
  };

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        window.clearTimeout(inactivityTimerRef.current);
      }
      if (reminderDismissTimerRef.current) {
        window.clearTimeout(reminderDismissTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    taskStartTimeRef.current = Date.now();
    setDecision('');
    setReason('');
    setOpenedState(emptyOpenState);
    setError('');
    resetInactivityReminder();

    const taskStartKey = `${userId}-${currentTask.id}`;
    if (lastTaskStartLoggedRef.current !== taskStartKey) {
      lastTaskStartLoggedRef.current = taskStartKey;
      safeLogEvent('TASK_START', `Task ${currentTask.id} 開始`, 0);
    }
  }, [taskIndex, userId, currentTask.id]);

  const handleOpenSection = (stateKey, eventType, targetLabel) => {
    resetInactivityReminder();
    if (!openedState[stateKey]) {
      setOpenedState((previous) => ({
        ...previous,
        [stateKey]: true
      }));
    }
    safeLogEvent(eventType, targetLabel);
  };

  const handleDecisionChange = (value) => {
    resetInactivityReminder();
    setDecision(value);
    safeLogEvent('SELECT_DECISION', value);
  };

  const handleReasonChange = (value) => {
    resetInactivityReminder();
    setReason(value);
    safeLogEvent('SELECT_DECISION_REASON', value);
  };

  const handleSubmitTask = async () => {
    if (!decision || !reason || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError('');
    setShowInactivityReminder(false);
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }
    if (reminderDismissTimerRef.current) {
      window.clearTimeout(reminderDismissTimerRef.current);
    }

    const decisionTime = Date.now() - taskStartTimeRef.current;
    const adoptedAi = decision === currentTask.aiSuggestion;
    const overrodeAi = !adoptedAi && decision !== '';
    const verificationCount = Object.values(openedState).filter(Boolean).length;

    const taskResult = {
      user_id: userId,
      task_id: currentTask.id,
      stock_name: currentTask.stockName,
      stock_code: currentTask.stockCode,
      story_title: currentTask.storyTitle,
      scenario_type: currentTask.scenarioType,
      prediction: currentTask.prediction,
      ai_suggestion: currentTask.aiSuggestion,
      confidence: currentTask.confidence,
      ai_correct: currentTask.aiCorrect,
      user_decision: decision,
      decision_reason: reason,
      adopted_ai: adoptedAi,
      overrode_ai: overrodeAi,
      opened_explanation: openedState.opened_explanation,
      opened_features: openedState.opened_features,
      opened_risk_warning: openedState.opened_risk_warning,
      opened_verification_hint: openedState.opened_verification_hint,
      verification_count: verificationCount,
      decision_time_ms: decisionTime
    };

    try {
      await logEvent(
        buildEventPayload('TASK_SUBMIT', `送出 Task ${currentTask.id}`, decisionTime)
      );
      await saveTaskResult(taskResult);

      if (taskIndex === tasks.length - 1) {
        await logEvent({
          ...buildEventPayload('EXPERIMENT_FINISH', '完成實驗', decisionTime),
          task_id: currentTask.id
        });
        onFinish();
        return;
      }

      setTaskIndex((previous) => previous + 1);
    } catch (apiError) {
      setError('任務結果送出失敗，請確認後端 API 是否啟動後再重試。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-container experiment-page">
      <div className="experiment-header">
        <div>
          <p className="system-label">使用者代號：{userId || '未輸入'}</p>
          <h1>投資情境任務</h1>
          <p className="header-disclaimer">
            本系統為課堂研究與模擬實驗，不構成任何投資建議。
          </p>
        </div>
        <div className="task-counter">Task {taskIndex + 1} / {tasks.length}</div>
      </div>

      <ProgressBar current={taskIndex + 1} total={tasks.length} />

      {error && <p className="error-message api-error">{error}</p>}
      {showInactivityReminder && (
        <div className="reminder-overlay" role="status" aria-live="polite">
          <div className="inactivity-reminder">
            <strong>作答提醒</strong>
            <p>
              你可以依目前資訊做出判斷，若仍不確定，也可以選擇觀望或不採納 AI 建議。
            </p>
          </div>
        </div>
      )}

      <TaskCard
        task={currentTask}
        decision={decision}
        reason={reason}
        openedState={openedState}
        onOpenSection={handleOpenSection}
        onDecisionChange={handleDecisionChange}
        onReasonChange={handleReasonChange}
        onSubmit={handleSubmitTask}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}

export default ExperimentPage;
