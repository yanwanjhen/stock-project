# AI 金融預測決策輔助介面

這是一個期末專題實驗網站，支援 HCI 與 xAI 課程報告使用。系統提供 5 題固定模擬投資情境，記錄每次點擊事件與每題最終任務結果，不包含後測問卷，也不產生 `survey_results.csv`。

## 專案結構

```text
frontend/
  src/App.jsx
  src/main.jsx
  src/data/tasks.js
  src/api/experimentApi.js
  src/pages/StartPage.jsx
  src/pages/ExperimentPage.jsx
  src/pages/FinishPage.jsx
  src/components/TaskCard.jsx
  src/components/PredictionPanel.jsx
  src/components/ExplanationPanel.jsx
  src/components/DecisionButtons.jsx
  src/components/ProgressBar.jsx
  src/styles/App.css
backend/
  server.js
  package.json
  data/
README.md
```

## 本機執行

後端：

```bash
cd backend
npm install
npm run dev
```

前端：

```bash
cd frontend
npm install
npm run dev
```

預設後端 API 位於 `http://localhost:5000`，前端 Vite 通常位於 `http://localhost:5173`。

## 環境變數

前端 API 位置由 `VITE_API_BASE_URL` 控制。可在 `frontend/.env` 設定：

```bash
VITE_API_BASE_URL=http://localhost:5000
```

部署到 Vercel 時，請在 Vercel 專案環境變數設定 `VITE_API_BASE_URL` 為 Render 後端網址，例如：

```bash
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

## API

後端提供以下 API：

- `GET /api/health`：測試後端是否正常
- `POST /api/log-event`：儲存點擊事件
- `POST /api/task-result`：儲存任務結果
- `GET /api/download/events`：下載 `events.csv`
- `GET /api/download/task-results`：下載 `task_results.csv`

## CSV 下載

本機下載網址：

- [http://localhost:5000/api/download/events](http://localhost:5000/api/download/events)
- [http://localhost:5000/api/download/task-results](http://localhost:5000/api/download/task-results)

部署後請使用 Render 後端網址加上：

- `/api/download/events`
- `/api/download/task-results`

後端會先將資料存為 JSONL：

- `backend/data/events.jsonl`
- `backend/data/task_results.jsonl`

下載 CSV 時會產生：

- `backend/data/events.csv`
- `backend/data/task_results.csv`

## events.csv 欄位

`events.csv` 記錄每一次點擊事件。

| 欄位 | 說明 |
| --- | --- |
| `user_id` | 使用者代號 |
| `task_id` | 任務編號 |
| `story_title` | 任務故事標題 |
| `scenario_type` | 任務類型 |
| `event_type` | 事件類型 |
| `event_target` | 點擊的元件 |
| `timestamp` | ISO 格式時間 |
| `elapsed_time_ms` | 從該任務開始到點擊經過的毫秒數 |
| `prediction` | AI 預測結果 |
| `ai_suggestion` | AI 投資建議 |
| `confidence` | 信心分數 |

事件類型包含：

- `START_EXPERIMENT`
- `TASK_START`
- `OPEN_EXPLANATION`
- `OPEN_FEATURES`
- `OPEN_RISK_WARNING`
- `OPEN_VERIFICATION_HINT`
- `SELECT_DECISION`
- `SELECT_DECISION_REASON`
- `TASK_SUBMIT`
- `EXPERIMENT_FINISH`

## task_results.csv 欄位

`task_results.csv` 記錄每一題最終任務結果。

| 欄位 | 說明 |
| --- | --- |
| `user_id` | 使用者代號 |
| `task_id` | 任務編號 |
| `stock_name` | 股票名稱 |
| `stock_code` | 股票代碼 |
| `story_title` | 任務故事標題 |
| `scenario_type` | 任務類型 |
| `prediction` | AI 預測結果 |
| `ai_suggestion` | AI 投資建議 |
| `confidence` | 信心分數 |
| `ai_correct` | AI 是否正確 |
| `user_decision` | 使用者最終投資決策 |
| `decision_reason` | 使用者選擇的主要決策理由 |
| `adopted_ai` | 使用者是否採納 AI 建議 |
| `overrode_ai` | 使用者是否覆寫 AI 建議 |
| `opened_explanation` | 是否查看模型解釋 |
| `opened_features` | 是否查看重要特徵 |
| `opened_risk_warning` | 是否查看風險提示 |
| `opened_verification_hint` | 是否查看驗證建議 |
| `verification_count` | 查看幾個輔助資訊 |
| `decision_time_ms` | 從任務開始到送出決策的總時間 |

## Vercel 部署前端

1. 將專案推到 GitHub。
2. 在 Vercel 新增專案，Root Directory 選擇 `frontend`。
3. Build Command 使用 `npm run build`。
4. Output Directory 使用 `dist`。
5. 設定環境變數 `VITE_API_BASE_URL` 為 Render 後端網址。
6. 部署完成後開啟 Vercel 網址測試流程。

## Render 部署後端

1. 在 Render 建立 Web Service。
2. Root Directory 選擇 `backend`。
3. Build Command 使用 `npm install`。
4. Start Command 使用 `npm start`。
5. Render 會自動提供 `PORT`，後端已使用 `const PORT = process.env.PORT || 5000`。
6. 部署完成後可測試 `https://your-render-service.onrender.com/api/health`。

## 實驗流程

1. 受試者輸入使用者代號，例如 `U001`。
2. 點擊「開始實驗」。
3. 依序完成 5 題模擬投資情境任務。
4. 每題可展開模型解釋、重要特徵、風險提示、驗證建議。
5. 必須選擇投資決策與主要決策理由後才能送出。
6. 完成第 5 題後進入完成頁，顯示「實驗完成，感謝參與」。

## 採納 AI 與覆寫 AI 規則

若 `user_decision` 與 `ai_suggestion` 語意一致，`adopted_ai = true`。例如 AI 建議「買進」且使用者選擇「買進」。

若使用者選擇與 AI 建議不同，且不是尚未決策，`overrode_ai = true`。例如 AI 建議「買進」但使用者選擇「觀望」、「持有」、「賣出」或「不採納 AI 建議」。
