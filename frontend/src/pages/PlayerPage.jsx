/**
 * 플레이어 페이지
 * 게임 JSON을 로드하고 플레이
 */
import React, { useState } from 'react';
import axios from 'axios';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

function PlayerPage() {
  const { currentLanguage, loadGameData } = useGameStore();
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameState, setGameState] = useState({
    party: [],
    inventory: [],
    currentLocation: null,
    playerName: '',
  });
  
  // 게임 로드
  const handleLoadGame = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/api/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      loadGameData(response.data);
      setGameLoaded(true);
      alert('게임이 로드되었습니다!');
    } catch (error) {
      alert(`로드 실패: ${error.message}`);
    }
  };
  
  // 게임 시작
  const handleStartGame = () => {
    if (!gameLoaded) {
      alert('먼저 게임 파일을 로드해주세요.');
      return;
    }
    
    const playerName = prompt('플레이어 이름을 입력하세요:');
    if (playerName) {
      setGameState({
        ...gameState,
        playerName,
      });
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        게임 플레이어
      </h1>
      
      {!gameLoaded ? (
        // 게임 로드 화면
        <div className="card text-center py-12">
          <div className="text-6xl mb-6">🎮</div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            게임 파일을 로드하세요
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            메이커에서 만든 JSON 파일을 업로드하여 게임을 시작할 수 있습니다.
          </p>
          <label className="btn btn-primary text-lg cursor-pointer inline-block">
            📂 게임 파일 선택
            <input
              type="file"
              accept=".json"
              onChange={handleLoadGame}
              className="hidden"
            />
          </label>
        </div>
      ) : gameState.playerName ? (
        // 게임 플레이 화면
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              안녕하세요, {gameState.playerName}님!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              게임 플레이 기능은 개발 중입니다. 곧 업데이트될 예정입니다!
            </p>
          </div>
          
          {/* 파티 */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              🐾 파티
            </h3>
            {gameState.party.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">파티가 비어있습니다.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {gameState.party.map((monmus, index) => (
                  <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-bold dark:text-white">{monmus.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Lv. {monmus.level}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 인벤토리 */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              🎒 인벤토리
            </h3>
            {gameState.inventory.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">인벤토리가 비어있습니다.</p>
            ) : (
              <div className="grid md:grid-cols-4 gap-4">
                {gameState.inventory.map((item, index) => (
                  <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                    <h4 className="font-bold dark:text-white text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">x{item.quantity}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // 게임 시작 화면
        <div className="card text-center py-12">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            게임이 로드되었습니다!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            게임을 시작하려면 아래 버튼을 클릭하세요.
          </p>
          <button onClick={handleStartGame} className="btn btn-primary text-lg">
            ▶️ 게임 시작
          </button>
        </div>
      )}
    </div>
  );
}

export default PlayerPage;
