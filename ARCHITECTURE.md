# 아키텍처 문서 | Architecture Documentation

## 시스템 개요 | System Overview

텍스트 RPG 메이커는 백엔드(FastAPI)와 프론트엔드(React)로 구성된 풀스택 웹 애플리케이션입니다.

```
┌─────────────────────────────────────────────────────────┐
│                    사용자 / User                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              프론트엔드 / Frontend (React)                │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Router: 페이지 네비게이션 / Page Navigation        │  │
│  │  - HomePage: 소개 및 시작                           │  │
│  │  - MakerPage: 게임 제작                             │  │
│  │  - PlayerPage: 게임 플레이                          │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  State Management (Zustand)                        │  │
│  │  - gameStore: 전역 게임 데이터 상태                 │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Components: 재사용 가능한 UI                       │  │
│  │  - GameInfoEditor                                   │  │
│  │  - AttributeEditor                                  │  │
│  │  - SkillEditor                                      │  │
│  │  - ItemEditor                                       │  │
│  │  - MonmusEditor                                     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/REST API
                          ▼
┌─────────────────────────────────────────────────────────┐
│               백엔드 / Backend (FastAPI)                 │
│  ┌───────────────────────────────────────────────────┐  │
│  │  API Endpoints                                      │  │
│  │  - POST /api/export: JSON 익스포트                  │  │
│  │  - POST /api/import: JSON 임포트                    │  │
│  │  - POST /api/gemini/generate: AI 생성              │  │
│  │  - GET /api/id/{type}: ID 생성                      │  │
│  │  - GET /api/plugins: 플러그인 목록                  │  │
│  │  - POST /api/validate: 데이터 검증                 │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Data Models (Pydantic)                             │  │
│  │  - GameData                                         │  │
│  │  - Monmus                                           │  │
│  │  - Skill                                            │  │
│  │  - Item                                             │  │
│  │  - AttributeType                                    │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Plugin System                                      │  │
│  │  - PluginLoader: 플러그인 동적 로드                 │  │
│  │  - Hooks: 이벤트 기반 확장                          │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              외부 서비스 / External Services              │
│  - Google Gemini API: AI 콘텐츠 생성                     │
└─────────────────────────────────────────────────────────┘
```

## 데이터 흐름 | Data Flow

### 게임 제작 워크플로우 | Game Creation Workflow

```
사용자 입력 (User Input)
    │
    ▼
프론트엔드 컴포넌트 (Frontend Component)
    │
    ▼
Zustand Store (State Update)
    │
    ▼
익스포트 버튼 클릭 (Export Button)
    │
    ▼
POST /api/export
    │
    ▼
백엔드 데이터 검증 (Backend Validation)
    │
    ▼
JSON 파일 생성 (JSON File Generation)
    │
    ▼
브라우저 다운로드 (Browser Download)
```

### 게임 임포트 워크플로우 | Game Import Workflow

```
JSON 파일 업로드 (JSON File Upload)
    │
    ▼
POST /api/import
    │
    ▼
백엔드 파싱 & 검증 (Backend Parsing & Validation)
    │
    ▼
GameData 모델 변환 (Convert to GameData Model)
    │
    ▼
프론트엔드로 반환 (Return to Frontend)
    │
    ▼
Zustand Store 업데이트 (Update Zustand Store)
    │
    ▼
UI 업데이트 (Update UI)
```

## 컴포넌트 구조 | Component Structure

### 프론트엔드 컴포넌트 계층 | Frontend Component Hierarchy

```
App.jsx
├── Router
│   ├── HomePage
│   │   ├── 소개 섹션 / Introduction Section
│   │   ├── 기능 카드 / Feature Cards
│   │   └── 시작 가이드 / Getting Started Guide
│   ├── MakerPage
│   │   ├── 네비게이션 탭 / Navigation Tabs
│   │   ├── GameInfoEditor
│   │   ├── AttributeEditor
│   │   │   ├── 속성 리스트 / Attribute List
│   │   │   ├── 속성 폼 / Attribute Form
│   │   │   └── 타입 매치업 / Type Matchups
│   │   ├── SkillEditor
│   │   │   ├── 스킬 리스트 / Skill List
│   │   │   └── 스킬 폼 / Skill Form
│   │   ├── ItemEditor
│   │   │   ├── 아이템 리스트 / Item List
│   │   │   └── 아이템 폼 / Item Form
│   │   └── MonmusEditor
│   │       ├── 몬무 리스트 / Monmus List
│   │       └── 몬무 폼 / Monmus Form
│   └── PlayerPage
│       ├── 게임 로드 / Game Load
│       ├── 파티 관리 / Party Management
│       └── 인벤토리 / Inventory
└── Footer
```

## 데이터 모델 | Data Models

### GameData (전체 게임 데이터)
```python
{
    "version": "1.0.0",
    "game_title": MultilingualText,
    "game_description": MultilingualText,
    "author": str,
    "attributes": List[AttributeType],
    "skills": List[Skill],
    "items": List[Item],
    "monmus_list": List[Monmus],
    "map_nodes": List[MapNode],
    "events": List[EventNode],
    "npcs": List[NPC],
    "quests": List[Quest],
    "settings": Dict[str, Any]
}
```

### Monmus (몬무 데이터)
```python
{
    "id": int,
    "name": MultilingualText,
    "description": MultilingualText,
    "pokedex_number": int,
    "attribute_types": List[int],
    "base_stats": {
        "hp": int,
        "attack": int,
        "defense": int,
        "sp_attack": int,
        "sp_defense": int,
        "speed": int
    },
    "height": float,
    "weight": float,
    "exp_yield": int,
    "catch_rate": int,
    "learnable_skills": List[Dict],
    "evolution_conditions": List[Dict],
    "abilities": List[str]
}
```

## API 설계 | API Design

### RESTful Endpoints

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/` | API 정보 | - | API 메타데이터 |
| POST | `/api/export` | 게임 익스포트 | GameData | JSON |
| POST | `/api/import` | 게임 임포트 | File (JSON/YAML) | GameData |
| POST | `/api/gemini/generate` | AI 생성 | GeminiRequest | 생성 텍스트 |
| GET | `/api/id/{entity_type}` | 다음 ID | - | next_id |
| GET | `/api/plugins` | 플러그인 목록 | - | 플러그인 리스트 |
| POST | `/api/validate` | 데이터 검증 | GameData | 검증 결과 |

## 상태 관리 | State Management

### Zustand Store 구조

```javascript
useGameStore = {
  // 메타데이터
  gameTitle: MultilingualText,
  gameDescription: MultilingualText,
  author: string,
  version: string,
  
  // 게임 요소
  attributes: Array,
  skills: Array,
  items: Array,
  monmusList: Array,
  mapNodes: Array,
  events: Array,
  npcs: Array,
  quests: Array,
  
  // 설정
  currentLanguage: string,
  settings: Object,
  
  // Actions
  setGameTitle(),
  addAttribute(),
  updateAttribute(),
  deleteAttribute(),
  // ... 기타 CRUD 메서드
}
```

## 플러그인 시스템 | Plugin System

### 플러그인 라이프사이클

```
플러그인 디렉토리 스캔
    ↓
manifest.json 읽기
    ↓
플러그인 등록
    ↓
훅 포인트에서 플러그인 실행
    ↓
결과 반환
```

### 사용 가능한 훅 | Available Hooks

- `on_monmus_create`: 몬무 생성 시
- `on_skill_use`: 스킬 사용 시
- `on_battle_start`: 전투 시작 시
- `on_battle_end`: 전투 종료 시
- `on_level_up`: 레벨업 시
- `on_evolution`: 진화 시

## 보안 고려사항 | Security Considerations

1. **입력 검증**: Pydantic 모델로 모든 입력 검증
2. **CORS 설정**: 허용된 오리진만 접근
3. **API 키 관리**: 클라이언트 측에서만 관리 (서버 저장 X)
4. **XSS 방어**: React의 자동 이스케이핑
5. **파일 업로드**: JSON/YAML만 허용, 크기 제한

## 성능 최적화 | Performance Optimization

1. **코드 스플리팅**: React.lazy()로 컴포넌트 지연 로딩
2. **메모이제이션**: useMemo, useCallback 사용
3. **가상화**: 큰 리스트는 react-window 고려
4. **이미지 최적화**: WebP 포맷, 레이지 로딩
5. **번들 크기**: Tree shaking, 불필요한 의존성 제거

## 확장성 | Scalability

### 수평 확장
- 백엔드: 여러 인스턴스로 로드 밸런싱
- 프론트엔드: CDN을 통한 정적 파일 배포

### 기능 확장
- 플러그인 시스템으로 새 기능 추가
- API 버전 관리로 하위 호환성 유지

## 배포 아키텍처 | Deployment Architecture

### GitHub Pages (프론트엔드만)
```
GitHub Repository
    ↓
GitHub Actions
    ↓
npm run build
    ↓
GitHub Pages
```

### Vercel/Netlify (풀스택)
```
GitHub Repository
    ↓
Vercel/Netlify
    ↓
자동 빌드 & 배포
    ↓
CDN 배포
```

### Docker (자체 호스팅)
```
Dockerfile
    ↓
Docker Build
    ↓
Docker Container
    ↓
웹 서버
```

## 모니터링 & 로깅 | Monitoring & Logging

### 로그 레벨
- ERROR: 에러 발생 시
- WARNING: 경고 (예: 잘못된 참조)
- INFO: 일반 정보 (예: 게임 로드)
- DEBUG: 디버깅 정보

### 메트릭
- API 응답 시간
- 에러율
- 활성 사용자
- 게임 생성 수

## 향후 계획 | Future Plans

1. **실시간 협업**: WebSocket으로 다중 사용자 편집
2. **클라우드 저장소**: 게임을 클라우드에 저장
3. **모바일 앱**: React Native로 모바일 버전
4. **소셜 기능**: 게임 공유, 평가, 댓글
5. **고급 에디터**: 비주얼 스크립팅, 맵 편집기

---

**아키텍처 문의사항은 GitHub Issues로 부탁드립니다.**
**For architecture questions, please use GitHub Issues.**
