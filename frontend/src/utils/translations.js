/**
 * 다국어 번역 유틸리티
 * 한국어가 기본이며, 영어와 일본어 지원
 */

export const translations = {
  ko: {
    // 네비게이션
    home: '홈',
    maker: '메이커',
    player: '플레이어',
    settings: '설정',
    
    // 메이커 메뉴
    gameInfo: '게임 정보',
    attributes: '속성',
    skills: '스킬',
    items: '아이템',
    monmus: '몬무',
    map: '맵',
    events: '이벤트',
    npcs: 'NPC',
    quests: '퀘스트',
    
    // 버튼
    add: '추가',
    edit: '수정',
    delete: '삭제',
    save: '저장',
    cancel: '취소',
    import: '임포트',
    export: '익스포트',
    new: '새로 만들기',
    
    // 게임 정보
    gameTitle: '게임 타이틀',
    gameDescription: '게임 설명',
    author: '제작자',
    version: '버전',
    
    // 속성
    attributeName: '속성 이름',
    typeMatchups: '타입 상성',
    effective: '효과적',
    notEffective: '효과 없음',
    
    // 스킬
    skillName: '스킬 이름',
    skillDescription: '스킬 설명',
    power: '위력',
    accuracy: '명중률',
    pp: 'PP',
    attributeType: '속성 타입',
    effects: '효과',
    
    // 아이템
    itemName: '아이템 이름',
    itemDescription: '아이템 설명',
    category: '카테고리',
    usageContext: '사용 상황',
    price: '가격',
    
    // 몬무
    monmusName: '몬무 이름',
    monmusDescription: '몬무 설명',
    pokedexNumber: '도감 번호',
    baseStats: '기본 스탯',
    hp: 'HP',
    attack: '공격',
    defense: '방어',
    spAttack: '특수공격',
    spDefense: '특수방어',
    speed: '스피드',
    height: '키',
    weight: '몸무게',
    expYield: '경험치',
    catchRate: '계약 확률',
    learnableSkills: '습득 가능 스킬',
    evolution: '진화',
    
    // 공통
    name: '이름',
    description: '설명',
    korean: '한국어',
    english: '영어',
    japanese: '일본어',
    
    // 메시지
    saved: '저장되었습니다',
    deleted: '삭제되었습니다',
    error: '오류가 발생했습니다',
    importSuccess: '임포트 성공',
    exportSuccess: '익스포트 성공',
    
    // AI 도우미
    aiAssist: 'AI 도우미',
    generateDescription: '설명 생성',
    apiKey: 'API 키',
    enterApiKey: 'Gemini API 키를 입력하세요',
    
    // 플레이어
    startGame: '게임 시작',
    loadGame: '게임 불러오기',
    saveGame: '게임 저장',
    party: '파티',
    inventory: '인벤토리',
    battle: '배틀',
  },
  en: {
    // Navigation
    home: 'Home',
    maker: 'Maker',
    player: 'Player',
    settings: 'Settings',
    
    // Maker menu
    gameInfo: 'Game Info',
    attributes: 'Attributes',
    skills: 'Skills',
    items: 'Items',
    monmus: 'Monmus',
    map: 'Map',
    events: 'Events',
    npcs: 'NPCs',
    quests: 'Quests',
    
    // Buttons
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    import: 'Import',
    export: 'Export',
    new: 'New',
    
    // Game info
    gameTitle: 'Game Title',
    gameDescription: 'Game Description',
    author: 'Author',
    version: 'Version',
    
    // Attributes
    attributeName: 'Attribute Name',
    typeMatchups: 'Type Matchups',
    effective: 'Effective',
    notEffective: 'Not Effective',
    
    // Skills
    skillName: 'Skill Name',
    skillDescription: 'Skill Description',
    power: 'Power',
    accuracy: 'Accuracy',
    pp: 'PP',
    attributeType: 'Attribute Type',
    effects: 'Effects',
    
    // Items
    itemName: 'Item Name',
    itemDescription: 'Item Description',
    category: 'Category',
    usageContext: 'Usage Context',
    price: 'Price',
    
    // Monmus
    monmusName: 'Monmus Name',
    monmusDescription: 'Monmus Description',
    pokedexNumber: 'Pokedex Number',
    baseStats: 'Base Stats',
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    spAttack: 'Sp. Attack',
    spDefense: 'Sp. Defense',
    speed: 'Speed',
    height: 'Height',
    weight: 'Weight',
    expYield: 'Exp. Yield',
    catchRate: 'Catch Rate',
    learnableSkills: 'Learnable Skills',
    evolution: 'Evolution',
    
    // Common
    name: 'Name',
    description: 'Description',
    korean: 'Korean',
    english: 'English',
    japanese: 'Japanese',
    
    // Messages
    saved: 'Saved',
    deleted: 'Deleted',
    error: 'An error occurred',
    importSuccess: 'Import successful',
    exportSuccess: 'Export successful',
    
    // AI Assistant
    aiAssist: 'AI Assistant',
    generateDescription: 'Generate Description',
    apiKey: 'API Key',
    enterApiKey: 'Enter Gemini API Key',
    
    // Player
    startGame: 'Start Game',
    loadGame: 'Load Game',
    saveGame: 'Save Game',
    party: 'Party',
    inventory: 'Inventory',
    battle: 'Battle',
  },
  ja: {
    // ナビゲーション
    home: 'ホーム',
    maker: 'メーカー',
    player: 'プレイヤー',
    settings: '設定',
    
    // メーカーメニュー
    gameInfo: 'ゲーム情報',
    attributes: '属性',
    skills: 'スキル',
    items: 'アイテム',
    monmus: 'モンムス',
    map: 'マップ',
    events: 'イベント',
    npcs: 'NPC',
    quests: 'クエスト',
    
    // ボタン
    add: '追加',
    edit: '編集',
    delete: '削除',
    save: '保存',
    cancel: 'キャンセル',
    import: 'インポート',
    export: 'エクスポート',
    new: '新規作成',
    
    // ゲーム情報
    gameTitle: 'ゲームタイトル',
    gameDescription: 'ゲーム説明',
    author: '制作者',
    version: 'バージョン',
    
    // 属性
    attributeName: '属性名',
    typeMatchups: 'タイプ相性',
    effective: '効果的',
    notEffective: '効果なし',
    
    // スキル
    skillName: 'スキル名',
    skillDescription: 'スキル説明',
    power: '威力',
    accuracy: '命中率',
    pp: 'PP',
    attributeType: '属性タイプ',
    effects: '効果',
    
    // アイテム
    itemName: 'アイテム名',
    itemDescription: 'アイテム説明',
    category: 'カテゴリ',
    usageContext: '使用状況',
    price: '価格',
    
    // モンムス
    monmusName: 'モンムス名',
    monmusDescription: 'モンムス説明',
    pokedexNumber: '図鑑番号',
    baseStats: '基本ステータス',
    hp: 'HP',
    attack: '攻撃',
    defense: '防御',
    spAttack: '特攻',
    spDefense: '特防',
    speed: '素早さ',
    height: '高さ',
    weight: '重さ',
    expYield: '経験値',
    catchRate: '契約確率',
    learnableSkills: '習得可能スキル',
    evolution: '進化',
    
    // 共通
    name: '名前',
    description: '説明',
    korean: '韓国語',
    english: '英語',
    japanese: '日本語',
    
    // メッセージ
    saved: '保存されました',
    deleted: '削除されました',
    error: 'エラーが発生しました',
    importSuccess: 'インポート成功',
    exportSuccess: 'エクスポート成功',
    
    // AIアシスタント
    aiAssist: 'AIアシスタント',
    generateDescription: '説明生成',
    apiKey: 'APIキー',
    enterApiKey: 'Gemini APIキーを入力',
    
    // プレイヤー
    startGame: 'ゲーム開始',
    loadGame: 'ゲーム読込',
    saveGame: 'ゲーム保存',
    party: 'パーティ',
    inventory: 'インベントリ',
    battle: 'バトル',
  }
};

/**
 * 번역 텍스트 가져오기
 * @param {string} key - 번역 키
 * @param {string} lang - 언어 코드 (ko, en, ja)
 * @returns {string} 번역된 텍스트
 */
export const t = (key, lang = 'ko') => {
  return translations[lang]?.[key] || translations.ko[key] || key;
};

export default translations;
