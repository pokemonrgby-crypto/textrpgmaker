/**
 * 게임 정보 편집기
 * 게임 타이틀, 설명, 제작자 정보 입력
 */
import React from 'react';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

function GameInfoEditor() {
  const {
    gameTitle,
    gameDescription,
    author,
    version,
    setGameTitle,
    setGameDescription,
    setAuthor,
    currentLanguage,
  } = useGameStore();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white mb-6">
        게임 기본 정보
      </h2>
      
      {/* 게임 타이틀 */}
      <div>
        <label className="label">
          {t('gameTitle', currentLanguage)} *
        </label>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t('korean', currentLanguage)}
            </label>
            <input
              type="text"
              value={gameTitle.ko}
              onChange={(e) => setGameTitle({ ...gameTitle, ko: e.target.value })}
              className="input-field"
              placeholder="게임 타이틀을 입력하세요"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t('english', currentLanguage)}
            </label>
            <input
              type="text"
              value={gameTitle.en}
              onChange={(e) => setGameTitle({ ...gameTitle, en: e.target.value })}
              className="input-field"
              placeholder="Enter game title"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t('japanese', currentLanguage)}
            </label>
            <input
              type="text"
              value={gameTitle.ja}
              onChange={(e) => setGameTitle({ ...gameTitle, ja: e.target.value })}
              className="input-field"
              placeholder="ゲームタイトルを入力"
            />
          </div>
        </div>
      </div>
      
      {/* 게임 설명 */}
      <div>
        <label className="label">
          {t('gameDescription', currentLanguage)} *
        </label>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t('korean', currentLanguage)}
            </label>
            <textarea
              value={gameDescription.ko}
              onChange={(e) => setGameDescription({ ...gameDescription, ko: e.target.value })}
              className="input-field"
              rows="4"
              placeholder="게임 설명을 입력하세요"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t('english', currentLanguage)}
            </label>
            <textarea
              value={gameDescription.en}
              onChange={(e) => setGameDescription({ ...gameDescription, en: e.target.value })}
              className="input-field"
              rows="4"
              placeholder="Enter game description"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t('japanese', currentLanguage)}
            </label>
            <textarea
              value={gameDescription.ja}
              onChange={(e) => setGameDescription({ ...gameDescription, ja: e.target.value })}
              className="input-field"
              rows="4"
              placeholder="ゲーム説明を入力"
            />
          </div>
        </div>
      </div>
      
      {/* 제작자 */}
      <div>
        <label className="label">
          {t('author', currentLanguage)}
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input-field"
          placeholder="제작자 이름을 입력하세요"
        />
      </div>
      
      {/* 버전 */}
      <div>
        <label className="label">
          {t('version', currentLanguage)}
        </label>
        <input
          type="text"
          value={version}
          className="input-field"
          disabled
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          버전은 자동으로 관리됩니다.
        </p>
      </div>
      
      {/* 안내 메시지 */}
      <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-primary p-4 rounded">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>팁:</strong> 모든 언어를 입력하지 않아도 됩니다. 기본 언어(한국어)만 입력하고 나중에 추가할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default GameInfoEditor;
