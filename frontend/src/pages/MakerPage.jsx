/**
 * 메이커 페이지
 * 게임 제작을 위한 모든 편집 도구 제공
 */
import React, { useState } from 'react';
import axios from 'axios';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

// 컴포넌트 임포트
import GameInfoEditor from '../components/GameInfoEditor';
import AttributeEditor from '../components/AttributeEditor';
import SkillEditor from '../components/SkillEditor';
import ItemEditor from '../components/ItemEditor';
import MonmusEditor from '../components/MonmusEditor';

function MakerPage() {
  const { currentLanguage, exportGameData, loadGameData, reset } = useGameStore();
  const [activeTab, setActiveTab] = useState('gameInfo');
  const [notification, setNotification] = useState(null);
  
  // 알림 표시
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };
  
  // JSON 익스포트
  const handleExport = async () => {
    try {
      const gameData = exportGameData();
      const dataStr = JSON.stringify(gameData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `game_${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showNotification(t('exportSuccess', currentLanguage));
    } catch (error) {
      showNotification(`${t('error', currentLanguage)}: ${error.message}`, 'error');
    }
  };
  
  // JSON 임포트
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/api/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      loadGameData(response.data);
      showNotification(t('importSuccess', currentLanguage));
    } catch (error) {
      showNotification(`${t('error', currentLanguage)}: ${error.message}`, 'error');
    }
  };
  
  // 새 프로젝트 시작
  const handleNewProject = () => {
    if (confirm('현재 작업 내용이 초기화됩니다. 계속하시겠습니까?')) {
      reset();
      showNotification('새 프로젝트가 생성되었습니다.');
    }
  };
  
  // 탭 메뉴
  const tabs = [
    { id: 'gameInfo', label: t('gameInfo', currentLanguage), icon: 'ℹ️' },
    { id: 'attributes', label: t('attributes', currentLanguage), icon: '⚡' },
    { id: 'skills', label: t('skills', currentLanguage), icon: '⚔️' },
    { id: 'items', label: t('items', currentLanguage), icon: '🎒' },
    { id: 'monmus', label: t('monmus', currentLanguage), icon: '🐾' },
    { id: 'map', label: t('map', currentLanguage), icon: '🗺️' },
    { id: 'events', label: t('events', currentLanguage), icon: '📜' },
    { id: 'npcs', label: t('npcs', currentLanguage), icon: '👥' },
    { id: 'quests', label: t('quests', currentLanguage), icon: '📋' },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 알림 */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
      
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          게임 메이커
        </h1>
        <div className="flex space-x-4">
          <button onClick={handleNewProject} className="btn bg-gray-500 text-white hover:bg-gray-600">
            {t('new', currentLanguage)}
          </button>
          <label className="btn bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            {t('import', currentLanguage)}
            <input type="file" accept=".json,.yaml,.yml" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={handleExport} className="btn btn-primary">
            {t('export', currentLanguage)}
          </button>
        </div>
      </div>
      
      {/* 탭 네비게이션 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* 탭 콘텐츠 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {activeTab === 'gameInfo' && <GameInfoEditor />}
        {activeTab === 'attributes' && <AttributeEditor />}
        {activeTab === 'skills' && <SkillEditor />}
        {activeTab === 'items' && <ItemEditor />}
        {activeTab === 'monmus' && <MonmusEditor />}
        {activeTab === 'map' && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>맵 편집기는 개발 중입니다.</p>
          </div>
        )}
        {activeTab === 'events' && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>이벤트 편집기는 개발 중입니다.</p>
          </div>
        )}
        {activeTab === 'npcs' && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>NPC 편집기는 개발 중입니다.</p>
          </div>
        )}
        {activeTab === 'quests' && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>퀘스트 편집기는 개발 중입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MakerPage;
