/**
 * 게임 데이터 전역 상태 관리 (Zustand)
 * 모든 게임 데이터를 중앙에서 관리
 */
import { create } from 'zustand';

const useGameStore = create((set, get) => ({
  // 게임 메타데이터
  gameTitle: { ko: '', en: '', ja: '' },
  gameDescription: { ko: '', en: '', ja: '' },
  author: '',
  version: '1.0.0',
  
  // 게임 요소들
  attributes: [], // 속성 타입
  skills: [], // 스킬
  items: [], // 아이템
  monmusList: [], // 몬무 리스트
  mapNodes: [], // 맵 노드
  events: [], // 이벤트
  npcs: [], // NPC
  quests: [], // 퀘스트
  settings: {}, // 게임 설정
  
  // 현재 언어 설정
  currentLanguage: 'ko',
  
  // 게임 타이틀 설정
  setGameTitle: (title) => set({ gameTitle: title }),
  setGameDescription: (description) => set({ gameDescription: description }),
  setAuthor: (author) => set({ author }),
  
  // 속성 타입 관리
  addAttribute: (attribute) => set((state) => ({
    attributes: [...state.attributes, attribute]
  })),
  updateAttribute: (id, updatedAttribute) => set((state) => ({
    attributes: state.attributes.map(attr => 
      attr.id === id ? { ...attr, ...updatedAttribute } : attr
    )
  })),
  deleteAttribute: (id) => set((state) => ({
    attributes: state.attributes.filter(attr => attr.id !== id)
  })),
  
  // 스킬 관리
  addSkill: (skill) => set((state) => ({
    skills: [...state.skills, skill]
  })),
  updateSkill: (id, updatedSkill) => set((state) => ({
    skills: state.skills.map(skill => 
      skill.id === id ? { ...skill, ...updatedSkill } : skill
    )
  })),
  deleteSkill: (id) => set((state) => ({
    skills: state.skills.filter(skill => skill.id !== id)
  })),
  
  // 아이템 관리
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  updateItem: (id, updatedItem) => set((state) => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    )
  })),
  deleteItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  // 몬무 관리
  addMonmus: (monmus) => set((state) => ({
    monmusList: [...state.monmusList, monmus]
  })),
  updateMonmus: (id, updatedMonmus) => set((state) => ({
    monmusList: state.monmusList.map(monmus => 
      monmus.id === id ? { ...monmus, ...updatedMonmus } : monmus
    )
  })),
  deleteMonmus: (id) => set((state) => ({
    monmusList: state.monmusList.filter(monmus => monmus.id !== id)
  })),
  
  // 맵 노드 관리
  addMapNode: (node) => set((state) => ({
    mapNodes: [...state.mapNodes, node]
  })),
  updateMapNode: (id, updatedNode) => set((state) => ({
    mapNodes: state.mapNodes.map(node => 
      node.id === id ? { ...node, ...updatedNode } : node
    )
  })),
  deleteMapNode: (id) => set((state) => ({
    mapNodes: state.mapNodes.filter(node => node.id !== id)
  })),
  
  // 이벤트 관리
  addEvent: (event) => set((state) => ({
    events: [...state.events, event]
  })),
  updateEvent: (id, updatedEvent) => set((state) => ({
    events: state.events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    )
  })),
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(event => event.id !== id)
  })),
  
  // NPC 관리
  addNPC: (npc) => set((state) => ({
    npcs: [...state.npcs, npc]
  })),
  updateNPC: (id, updatedNPC) => set((state) => ({
    npcs: state.npcs.map(npc => 
      npc.id === id ? { ...npc, ...updatedNPC } : npc
    )
  })),
  deleteNPC: (id) => set((state) => ({
    npcs: state.npcs.filter(npc => npc.id !== id)
  })),
  
  // 퀘스트 관리
  addQuest: (quest) => set((state) => ({
    quests: [...state.quests, quest]
  })),
  updateQuest: (id, updatedQuest) => set((state) => ({
    quests: state.quests.map(quest => 
      quest.id === id ? { ...quest, ...updatedQuest } : quest
    )
  })),
  deleteQuest: (id) => set((state) => ({
    quests: state.quests.filter(quest => quest.id !== id)
  })),
  
  // 언어 변경
  setLanguage: (lang) => set({ currentLanguage: lang }),
  
  // 전체 게임 데이터 로드 (임포트)
  loadGameData: (data) => set({
    gameTitle: data.game_title || { ko: '', en: '', ja: '' },
    gameDescription: data.game_description || { ko: '', en: '', ja: '' },
    author: data.author || '',
    version: data.version || '1.0.0',
    attributes: data.attributes || [],
    skills: data.skills || [],
    items: data.items || [],
    monmusList: data.monmus_list || [],
    mapNodes: data.map_nodes || [],
    events: data.events || [],
    npcs: data.npcs || [],
    quests: data.quests || [],
    settings: data.settings || {},
  }),
  
  // 전체 게임 데이터 익스포트
  exportGameData: () => {
    const state = get();
    return {
      version: state.version,
      game_title: state.gameTitle,
      game_description: state.gameDescription,
      author: state.author,
      attributes: state.attributes,
      skills: state.skills,
      items: state.items,
      monmus_list: state.monmusList,
      map_nodes: state.mapNodes,
      events: state.events,
      npcs: state.npcs,
      quests: state.quests,
      settings: state.settings,
    };
  },
  
  // 상태 초기화
  reset: () => set({
    gameTitle: { ko: '', en: '', ja: '' },
    gameDescription: { ko: '', en: '', ja: '' },
    author: '',
    version: '1.0.0',
    attributes: [],
    skills: [],
    items: [],
    monmusList: [],
    mapNodes: [],
    events: [],
    npcs: [],
    quests: [],
    settings: {},
  }),
}));

export default useGameStore;
