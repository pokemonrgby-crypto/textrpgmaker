/**
 * 홈 페이지 컴포넌트
 * 프로젝트 소개 및 시작 가이드
 */
import React from 'react';
import { Link } from 'react-router-dom';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

function HomePage() {
  const { currentLanguage } = useGameStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          텍스트 RPG 메이커
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          포켓몬 스타일의 몬무 기반 텍스트 RPG를 쉽게 만들어보세요!
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/maker" className="btn btn-primary text-lg">
            🎮 게임 만들기 시작
          </Link>
          <Link to="/player" className="btn btn-secondary text-lg">
            ▶️ 게임 플레이하기
          </Link>
        </div>
      </div>
      
      {/* 기능 소개 */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="text-4xl mb-4">✏️</div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">쉬운 제작</h3>
          <p className="text-gray-600 dark:text-gray-300">
            코딩 없이도 직관적인 웹 폼으로 게임을 만들 수 있습니다.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">몬무 시스템</h3>
          <p className="text-gray-600 dark:text-gray-300">
            포켓몬처럼 몬무를 수집하고 계약하며 파티를 구성하세요.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl mb-4">📤</div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">간편한 공유</h3>
          <p className="text-gray-600 dark:text-gray-300">
            JSON 파일 하나로 게임을 저장하고 다른 사람과 공유하세요.
          </p>
        </div>
      </div>
      
      {/* 주요 기능 */}
      <div className="card mb-12">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">주요 기능</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h4 className="font-semibold dark:text-white">속성 타입 시스템</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                자유롭게 속성을 정의하고 타입 상성표를 만드세요
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h4 className="font-semibold dark:text-white">스킬 & 아이템</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                다양한 효과를 가진 스킬과 아이템을 제작하세요
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h4 className="font-semibold dark:text-white">맵 & 이벤트</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                노드 기반 맵 편집기로 세계를 만들고 이벤트를 배치하세요
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h4 className="font-semibold dark:text-white">다국어 지원</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                한국어, 영어, 일본어로 게임을 만들 수 있습니다
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h4 className="font-semibold dark:text-white">AI 도우미</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Gemini API로 몬무 설명 등을 자동 생성하세요
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h4 className="font-semibold dark:text-white">플러그인 시스템</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                플러그인으로 기능을 확장할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 시작 가이드 */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">시작하기</h2>
        <ol className="space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-3">
              1
            </span>
            <div>
              <strong className="dark:text-white">게임 정보 입력:</strong> 메이커 페이지에서 게임 타이틀과 설명을 작성하세요.
            </div>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-3">
              2
            </span>
            <div>
              <strong className="dark:text-white">속성 정의:</strong> 게임에 사용할 속성 타입을 만들고 상성표를 설정하세요.
            </div>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-3">
              3
            </span>
            <div>
              <strong className="dark:text-white">몬무 제작:</strong> 스탯, 스킬, 진화 조건 등을 설정하여 몬무를 만드세요.
            </div>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-3">
              4
            </span>
            <div>
              <strong className="dark:text-white">맵 & 이벤트:</strong> 게임 월드를 만들고 스토리 이벤트를 추가하세요.
            </div>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-3">
              5
            </span>
            <div>
              <strong className="dark:text-white">익스포트 & 플레이:</strong> JSON 파일로 저장하고 플레이어에서 테스트하세요!
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default HomePage;
