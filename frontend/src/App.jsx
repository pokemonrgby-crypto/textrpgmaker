/**
 * 메인 앱 컴포넌트
 * 라우팅 및 전체 레이아웃 관리
 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import useGameStore from './store/gameStore';
import { t } from './utils/translations';

// 페이지 컴포넌트 임포트
import HomePage from './pages/HomePage';
import MakerPage from './pages/MakerPage';
import PlayerPage from './pages/PlayerPage';

function App() {
  const { currentLanguage, setLanguage } = useGameStore();
  const [darkMode, setDarkMode] = useState(false);
  
  // 다크 모드 토글
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        {/* 네비게이션 바 */}
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-2xl font-bold text-primary">
                    텍스트 RPG 메이커
                  </h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="border-transparent text-gray-900 dark:text-gray-100 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    {t('home', currentLanguage)}
                  </Link>
                  <Link
                    to="/maker"
                    className="border-transparent text-gray-900 dark:text-gray-100 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    {t('maker', currentLanguage)}
                  </Link>
                  <Link
                    to="/player"
                    className="border-transparent text-gray-900 dark:text-gray-100 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    {t('player', currentLanguage)}
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* 언어 선택 */}
                <select
                  value={currentLanguage}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
                
                {/* 다크 모드 토글 */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="다크 모드 토글"
                >
                  {darkMode ? '🌞' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* 메인 콘텐츠 */}
        <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/maker" element={<MakerPage />} />
            <Route path="/player" element={<PlayerPage />} />
          </Routes>
        </main>
        
        {/* 푸터 */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © 2024 텍스트 RPG 메이커 - 몬무 게임 제작 도구
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
