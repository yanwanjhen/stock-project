export const tasks = [
  {
    id: 'T001',
    stockName: '台積電',
    stockCode: '2330.TW',
    storyTitle: 'AI 晶片熱潮下的半導體判斷',
    storyBackground: [
      '你是一位剛開始學習投資的大學生，最近在財經新聞中常看到 AI 晶片、資料中心與先進製程等關鍵字。台積電因為是先進製程的重要代表，也經常被放在 AI 供應鏈的討論中。',
      '你看到系統目前辨識台積電處於買入時機，量化模型顯示短期仍有上漲空間，但新聞情緒分數接近中立，代表市場對這檔股票的態度並不是單向樂觀。',
      '不過，台積電目前價格已高，近一年最大回撤，也就是一年內曾經從高點下跌的幅度，顯示過去曾有明顯價格波動。現在你需要根據 AI 系統提供的預測與可選擇查看的解釋資訊，做出自己的模擬投資判斷。'
    ],
    userRole: '你是一位剛開始學習投資的大學生，正在練習如何解讀 AI 投資建議。',
    decisionGoal:
      '請判斷明天是否要買進、賣出、觀望，或不採納 AI 建議。',
    scenarioType: 'HIGH_CONFIDENCE_CORRECT',
    marketInfo: {
      currentPrice: '2240.00',
      quantSignal: '買入',
      expectedReward: '6.258% / 140.17 元',
      sentimentScore: '-0.0335',
      marketState: '強勢偏多',
      maxDrawdown: '-12.7%',
      recommendationReliability: '中',
      newsCount: '共 24 則'
    },
    recentNewsContext:
      '模型讀到 24 則台積電相關新聞。正面新聞包含台積電子公司 TSMC Global Ltd. 公告取得固定收益證券，以及分析機構提到先進製程題材；負面新聞則包含部分投資人賣單與光速出售持股等訊息。',
    prediction: '明日可能上漲',
    aiSuggestion: '買進',
    confidence: 76,
    aiCorrect: true,
    explanation: [
      '量化訊號占 34%：模型主要根據歷史價格、近期走勢與市場狀態做出短線判斷，表示價格面目前偏向正面。',
      '預期報酬占 30%：模型估計約有 6.258% 的可能上漲空間，約等於 140.17 元，但這只是基於歷史價量條件的推估，不是保證報酬。',
      '新聞情緒占 18%：FinBERT 分數為 -0.0335，接近中立，代表近期正面與負面新聞大致互相抵消。',
      '回撤風險占 18%：近一年最大回撤為 -12.7%，表示這檔股票過去曾出現一定幅度的高點到低點下跌。整體來看，模型判斷較偏向價格與量化條件，而不是單純受到新聞題材帶動。'
    ],
    features: [
      {
        name: '量化訊號',
        value: 34,
        description: '模型目前給出買入訊號，與強勢偏多的市場狀態相符。'
      },
      {
        name: '預期報酬',
        value: 30,
        description: '模型估計預期報酬約 6.258%，約等於 140.17 元的價格空間。'
      },
      {
        name: '新聞情緒',
        value: 18,
        description: 'FinBERT 情緒分數為 -0.0335，顯示新聞面大致中立。'
      },
      {
        name: '回撤風險',
        value: 18,
        description: '近一年最大回撤為 -12.7%，表示過去曾有一定幅度的價格下跌。'
      }
    ],
    riskWarning:
      '台積電目前股價位置較高，若大盤或半導體族群突然轉弱，短線買盤可能降溫，股價可能出現回檔。近一年曾出現 -12.7% 的最大回撤，代表即使長期題材受到關注，短期仍可能有明顯上下震盪，進場時若沒有分批或停損規劃，可能承受較大的價格波動壓力。',
    verificationHint:
      '你可以再確認台積電是否站穩 2300 元以上，並檢查近期新聞是否由少數事件帶動；若要進場，可思考是否用小額分批方式降低風險。'
  },
  {
    id: 'T002',
    stockName: '鴻海',
    stockCode: '2317.TW',
    storyTitle: 'AI 伺服器新聞熱度下的追高抉擇',
    storyBackground: [
      '你是一位剛開始學習投資的大學生，最近看到許多新聞提到 AI 伺服器需求成長。鴻海因為電子代工、雲端與網通產品，以及 AI 伺服器出貨題材受到市場關注。',
      '你發現模型目前辨識鴻海處於回檔整理階段，也就是股價正在整理、尚未明確突破。量化模型給出買入訊號，並估計短期仍有約 6% 的上漲空間。',
      '但你也看到新聞情緒只是輕度偏多，近一年最大回撤達 -28.4%，代表過去一年內股價曾出現較大下跌。現在你需要判斷是否要先觀察，或依照模型訊號進行模擬決策。'
    ],
    userRole: '你是一位新手投資者，正在練習面對熱門新聞時不要只看表面熱度。',
    decisionGoal:
      '請判斷明天是否要買進鴻海、賣出、觀望，或不採納 AI 建議。',
    scenarioType: 'HIGH_CONFIDENCE_ERROR',
    marketInfo: {
      currentPrice: '248.50',
      quantSignal: '買入',
      expectedReward: '6.194% / 15.39 元',
      sentimentScore: '0.2588',
      marketState: '回檔整理',
      maxDrawdown: '-28.4%',
      recommendationReliability: '低',
      newsCount: '共 27 則'
    },
    recentNewsContext:
      '模型讀到 27 則鴻海相關新聞。正面新聞包含鴻海代重要子公司公告股東常會、以及鴻海持股盛新材料；負面新聞則提到部分分析師對同業與 AI 題材的疑慮。',
    prediction: '明日可能上漲',
    aiSuggestion: '買進',
    confidence: 48,
    aiCorrect: false,
    explanation: [
      '量化訊號占 32%：歷史價量資料顯示短期仍有上漲空間，因此模型產生買入訊號。',
      '新聞情緒占 24%：FinBERT 分數為 0.2588，表示近期新聞語氣略偏正向，但正向程度不算強烈。',
      '市場狀態占 22%：目前屬於回檔整理，意思是股價可能正在修復，但還沒有明確確認重新轉強。',
      '回撤風險占 22%：近一年最大回撤為 -28.4%，代表這檔股票過去曾有較大的價格下跌幅度。整體來看，模型看到反彈機會，但這不等於已經出現穩定上升趨勢。'
    ],
    features: [
      {
        name: '量化訊號',
        value: 32,
        description: '模型給出買入訊號，估計預期報酬約 6.194%。'
      },
      {
        name: '新聞情緒',
        value: 24,
        description: 'FinBERT 情緒分數為 0.2588，顯示新聞面輕度偏多。'
      },
      {
        name: '市場狀態',
        value: 22,
        description: '目前屬於回檔整理，代表股價還在整理階段，不一定能立即突破。'
      },
      {
        name: '回撤風險',
        value: 22,
        description: '近一年最大回撤為 -28.4%，需要更嚴格的停損與風險上限。'
      }
    ],
    riskWarning:
      '鴻海雖然有 AI 伺服器題材，但目前仍屬於回檔整理，代表股價可能只是短線反彈，尚未確認形成新的上升趨勢。近一年最大回撤達 -28.4%，若市場情緒轉弱或熱門題材降溫，股價可能快速拉回。若只因新聞熱度或買入訊號進場，可能會遇到追高後短線修正的風險。',
    verificationHint:
      '你可以觀察股價是否突破 260 元附近，並留意成交量是否放大；若你原本已有部位，可考慮在 240 元附近設警戒線。'
  },
  {
    id: 'T003',
    stockName: '台達電',
    stockCode: '2308.TW',
    storyTitle: 'AI 電源與散熱題材中的進場抉擇',
    storyBackground: [
      '你正在做一個模擬投資任務。最近你看到 AI 伺服器需要更多電力，也需要更好的散熱效率。台達電因為電源供應器、液冷散熱與能源效率題材，被放進 AI 供應鏈討論中。',
      '你看到系統目前辨識台達電也在回檔整理階段，量化模型給出買入訊號，但新聞情緒分數略偏空，而且目前可用新聞數量只有 4 則。',
      '你需要在量化訊號、新聞情緒與樣本數量之間做取捨，判斷是否要依照 AI 的買入訊號，或等待更明確的市場訊號再做決定。'
    ],
    userRole: '你是一位已有少量股票部位的新手投資者，正在學習如何解讀 AI 預測與市場資訊。',
    decisionGoal:
      '請判斷明天是否要買進、賣出、觀望，或不採納 AI 建議。',
    scenarioType: 'LOW_CONFIDENCE_CORRECT',
    marketInfo: {
      currentPrice: '2020.00',
      quantSignal: '買入',
      expectedReward: '5.353% / 108.12 元',
      sentimentScore: '-0.1221',
      marketState: '回檔整理',
      maxDrawdown: '-17.2%',
      recommendationReliability: '低',
      newsCount: '共 4 則'
    },
    recentNewsContext:
      '模型讀到 4 則台達電相關新聞，其中包含台達電近 5 日下跌、證券成交討論，以及鄭平示警 RE100 未達標可能影響訂單分配。',
    prediction: '明日可能小幅上漲',
    aiSuggestion: '買進',
    confidence: 42,
    aiCorrect: true,
    explanation: [
      '量化訊號占 31%：歷史價格與成交資訊中出現短線修復跡象，因此模型給出買入訊號。',
      '市場狀態占 25%：目前仍是回檔整理，表示股價尚未明確回到上升趨勢，後續仍需要觀察是否突破。',
      '新聞情緒占 22%：FinBERT 分數為 -0.1221，略偏負面，代表新聞面沒有明顯支持上漲。',
      '新聞樣本占 22%：目前只有 4 則新聞，情緒判斷容易受到少數事件影響。整體來看，這比較像是需要觀察的技術訊號，而不是非常確定的進場理由。'
    ],
    features: [
      {
        name: '量化訊號',
        value: 31,
        description: '模型給出買入訊號，估計預期報酬約 5.353%。'
      },
      {
        name: '市場狀態',
        value: 25,
        description: '目前處於回檔整理，代表股價尚未形成明顯上升趨勢。'
      },
      {
        name: '新聞情緒',
        value: 22,
        description: 'FinBERT 情緒分數為 -0.1221，略偏空。'
      },
      {
        name: '新聞樣本',
        value: 22,
        description: '目前只有 4 則新聞，情緒模型的代表性有限。'
      }
    ],
    riskWarning:
      '台達電的量化訊號偏向買入，但新聞情緒略偏負面，而且可參考的新聞數量偏少。這代表模型可能主要依賴價格資料，而新聞面尚未提供足夠支持。若後續市場對 AI 電源、散熱或能源題材的期待降溫，股價可能繼續整理，短線買入後可能需要等待較久才看到方向，也可能面臨回檔壓力。',
    verificationHint:
      '你可以等待股價突破 2020 元附近並伴隨成交量放大，再評估是否進場；若你原本已有部位，可留意 1818 元附近的 10% 停損參考。'
  },
  {
    id: 'T004',
    stockName: '長榮航',
    stockCode: '2618.TW',
    storyTitle: '旅遊復甦新聞下的航空股判斷',
    storyBackground: [
      '你是一位剛開始學習投資的大學生，最近看到旅遊復甦、出國人潮增加與航線恢復等新聞。航空股因此又被市場拿出來討論，其中長榮航成為你觀察的標的。',
      '系統目前辨識長榮航處於觀望階段，雖然量化模型給出買入訊號，但市場狀態顯示趨勢轉弱。新聞情緒分數略偏多，不過目前只有 2 則新聞，代表新聞面參考資料有限。',
      '你也注意到航空股容易受到油價、匯率，也就是新台幣與外幣交換價格，以及大盤氣氛影響。現在你需要同時閱讀 AI 建議與風險提示，再做出自己的判斷。'
    ],
    userRole: '你是一位正在練習比較利多消息與風險因素的新手投資者。',
    decisionGoal:
      '請判斷明天是否要買進長榮航，或根據你看到的資訊採取其他決策。',
    scenarioType: 'CONFLICT_RISK_WARNING',
    marketInfo: {
      currentPrice: '34.10',
      quantSignal: '買入',
      expectedReward: '5.250% / 1.79 元',
      sentimentScore: '0.2298',
      marketState: '趨勢轉弱',
      maxDrawdown: '-25.7%',
      recommendationReliability: '低',
      newsCount: '共 2 則'
    },
    recentNewsContext:
      '模型讀到 2 則長榮航相關新聞，包含股東常會說明會與台北國際觀光博覽會等活動訊息。這些新聞主要聚焦公司與投資人溝通，尚未透露重大利多或風險。',
    prediction: '明日可能上漲',
    aiSuggestion: '買進',
    confidence: 44,
    aiCorrect: false,
    explanation: [
      '量化訊號占 31%：歷史價量資料顯示短期可能有反彈空間，因此模型產生買入訊號。',
      '市場狀態占 27%：目前是趨勢轉弱，表示股價結構不夠穩定，可能仍有下行或整理壓力。',
      '新聞情緒占 20%：FinBERT 分數為 0.2298，略偏正向，但新聞只有 2 則，代表情緒訊號的參考性有限。',
      '回撤風險占 22%：近一年最大回撤為 -25.7%，顯示過去曾有較大跌幅。整體來看，模型看到價格上的機會，但市場狀態與資料量都提醒需要謹慎解讀。'
    ],
    features: [
      {
        name: '量化訊號',
        value: 31,
        description: '模型給出買入訊號，估計預期報酬約 5.25%。'
      },
      {
        name: '市場狀態',
        value: 27,
        description: '目前為趨勢轉弱，代表整體股價結構偏向下行或整理。'
      },
      {
        name: '新聞情緒',
        value: 20,
        description: 'FinBERT 情緒分數為 0.2298，略偏多，但新聞數量偏少。'
      },
      {
        name: '回撤風險',
        value: 22,
        description: '近一年最大回撤為 -25.7%，代表過去曾有較大跌幅。'
      }
    ],
    riskWarning:
      '長榮航的新聞樣本只有 2 則，情緒分數可能受到少數新聞影響，代表新聞面訊號不夠穩定。航空股也容易受到油價、匯率、旅遊需求與大盤氣氛影響，若油價上升或市場轉弱，成本壓力與投資人情緒可能抵銷旅遊復甦題材。加上目前市場狀態為趨勢轉弱，短線買入可能面臨反彈失敗或繼續下跌的風險。',
    verificationHint:
      '你可以先觀察股價是否突破 34.1 元附近的短期支撐位；若你原本已有部位，可考慮將 30.5 元附近作為 10% 風險上限參考，若跌破 32 元則留意趨勢轉弱加速。'
  },
  {
    id: 'T005',
    stockName: '國泰金',
    stockCode: '2882.TW',
    storyTitle: '股利新聞下的金融股買進判斷',
    storyBackground: [
      '你是一位偏好穩健股票的新手投資者，最近看到金融股股利政策、金控獲利與壽險評價等新聞。國泰金因為金控與壽險題材，出現在你的觀察清單中。',
      '系統目前辨識國泰金處於趨勢上升、基本面良好的階段，量化模型給出買入訊號，新聞情緒分數也明顯偏正向。',
      '不過，目前新聞數量只有 2 則，且近一年最大回撤為 -12.2%，顯示股價仍可能受到市場波動影響。現在你需要判斷這些資訊是否足以支持明天的投資決策。'
    ],
    userRole: '你是一位偏好穩健投資的新手，正在學習不要只根據單一新聞題材做決策。',
    decisionGoal:
      '請判斷明天是否要買進國泰金，或根據你看到的資訊選擇其他決策。',
    scenarioType: 'NEWS_SENTIMENT_DATA_LIMITATION',
    marketInfo: {
      currentPrice: '76.80',
      quantSignal: '買入',
      expectedReward: '6.199% / 4.76 元',
      sentimentScore: '0.6506',
      marketState: '強勢偏多',
      maxDrawdown: '-12.2%',
      recommendationReliability: '低',
      newsCount: '共 2 則'
    },
    recentNewsContext:
      '模型讀到 2 則國泰金相關新聞，包含 4 月獲利與 EPS，以及多家金控前 4 月獲利與殖利率題材。兩則新聞都偏正向。',
    prediction: '明日可能小幅上漲',
    aiSuggestion: '買進',
    confidence: 52,
    aiCorrect: false,
    explanation: [
      '量化訊號占 32%：目前市場狀態為強勢偏多，價格結構與買入訊號方向一致。',
      '新聞情緒占 28%：FinBERT 分數為 0.6506，代表近期新聞語氣明顯偏正向，可能受到獲利或股利題材帶動。',
      '預期報酬占 22%：模型估計約有 6.199% 的可能上漲空間，約等於 4.76 元，但仍屬於短線模型推估。',
      '回撤風險占 18%：近一年最大回撤為 -12.2%，表示金融股即使較穩健，也仍可能受到市場波動影響。整體來看，這個預測同時受到價格趨勢與正向新聞支撐，但新聞數量只有 2 則，仍需要留意樣本數不足。'
    ],
    features: [
      {
        name: '量化訊號',
        value: 32,
        description: '模型給出買入訊號，且與強勢偏多的市場狀態相符。'
      },
      {
        name: '新聞情緒',
        value: 28,
        description: 'FinBERT 情緒分數為 0.6506，顯示市場情緒偏多。'
      },
      {
        name: '預期報酬',
        value: 22,
        description: '模型估計預期報酬約 6.199%，約等於 4.76 元。'
      },
      {
        name: '回撤風險',
        value: 18,
        description: '近一年最大回撤為 -12.2%，表示股價仍可能受到市場波動影響。'
      }
    ],
    riskWarning:
      '國泰金的新聞數量只有 2 則，情緒分數可能受到股利或獲利新聞集中影響，未必能完整反映金融股的風險。金融股也可能受到利率、匯率、壽險淨值與整體市場資金流向影響；若市場資金轉向或利率預期改變，股價可能出現修正。雖然目前訊號偏正向，但資料來源較少時，模型可能高估短線利多的影響。',
    verificationHint:
      '你可以用 76.8 元作為參考進場價，或等待股價突破 78 元以上再加碼；若原本想一次進場，可考慮分批，並先想好停損位置。'
  }
];

export const marketLabels = {
  currentPrice: '目前價格',
  quantSignal: '量化訊號',
  expectedReward: '預期報酬',
  sentimentScore: '情緒分數',
  fiveDayChange: '近 5 日漲跌',
  volumeChange: '成交量變化',
  marketState: '市場狀態',
  newsSentiment: '新聞情緒',
  volatility: '波動程度',
  maxDrawdown: '近一年 Max DD',
  recommendationReliability: '建議可信度',
  newsCount: '新聞數量'
};

export const decisionOptions = ['買進', '賣出', '觀望', '不採納 AI 建議'];

export const reasonOptions = [
  '我主要相信 AI 預測與信心分數',
  '我查看模型解釋後認為合理',
  '我看到風險提示後決定保守',
  '我認為仍需要更多資訊，暫時不採納 AI',
  '其他'
];
