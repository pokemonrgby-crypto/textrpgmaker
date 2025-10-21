# 텍스트 RPG 메이커 - Text RPG Maker

[![Deploy to GitHub Pages](https://github.com/pokemonrgby-crypto/textrpgmaker/actions/workflows/deploy.yml/badge.svg)](https://github.com/pokemonrgby-crypto/textrpgmaker/actions/workflows/deploy.yml)

> 포켓몬 스타일의 몬무(Monster Girls) 기반 텍스트 RPG를 쉽게 만들고 플레이할 수 있는 웹 애플리케이션

## 📖 개요 | Overview

**한국어**: 코딩 지식 없이도 포켓몬 스타일의 몬무 기반 텍스트 RPG를 만들 수 있는 현대적인 웹 애플리케이션입니다. 직관적인 웹 폼을 통해 게임을 제작하고, JSON 파일 하나로 저장 및 공유할 수 있습니다.

**English**: A modern web application that allows you to create Pokemon-style Monmus-based text RPGs without coding knowledge. Create games through intuitive web forms and save/share them as a single JSON file.

## ✨ 주요 기능 | Key Features

- 🎮 **직관적인 웹 인터페이스** - 코딩 없이 게임 제작
- 🌏 **다국어 지원** - 한국어(기본), 영어, 일본어
- 🐾 **몬무 시스템** - 포켓몬처럼 수집하고 계약하는 몬무 메커니즘
- 📦 **JSON 임포트/익스포트** - 단일 파일로 게임 저장 및 공유
- 🤖 **AI 도우미** - Gemini API를 통한 콘텐츠 생성
- 🔌 **플러그인 시스템** - 기능 확장 가능
- 🎨 **다크 모드** - 다크/라이트 테마 지원
- 🚀 **쉬운 배포** - GitHub Pages, Vercel, Netlify 등 지원

## 🏗️ 기술 스택 | Tech Stack

### Backend
- **FastAPI** - 고성능 Python 웹 프레임워크
- **Pydantic** - 데이터 검증
- **Google Generative AI** - AI 콘텐츠 생성

### Frontend
- **React 18** - UI 라이브러리
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 CSS 프레임워크
- **Zustand** - 상태 관리
- **Axios** - HTTP 클라이언트

## 🚀 빠른 시작 | Quick Start

### 로컬 개발 환경 | Local Development

#### 1. 레포지토리 클론
```bash
git clone https://github.com/pokemonrgby-crypto/textrpgmaker.git
cd textrpgmaker
```

#### 2. 백엔드 실행 | Run Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
서버는 `http://localhost:8000`에서 실행됩니다.

#### 3. 프론트엔드 실행 | Run Frontend
```bash
cd frontend
npm install
npm run dev
```
프론트엔드는 `http://localhost:3000`에서 실행됩니다.

### Docker 사용 | Using Docker
```bash
docker build -t textrpg-maker .
docker run -p 8000:8000 textrpg-maker
```

## 📚 사용 방법 | Usage

자세한 사용 방법은 다음 문서를 참고하세요:
- [한국어 사용 설명서](INSTRUCTIONS_KO.md)
- [English User Guide](INSTRUCTIONS_EN.md)

### 기본 워크플로우 | Basic Workflow

1. **게임 정보 설정** - 타이틀과 설명 입력
2. **속성 타입 정의** - 불, 물, 풀 등의 속성과 상성 설정
3. **스킬 생성** - 몬무가 사용할 기술 제작
4. **아이템 추가** - 포션, 계약구 등 아이템 추가
5. **몬무 제작** - 스탯, 스킬, 진화 조건 설정
6. **맵 & 이벤트** - 게임 월드와 스토리 구성
7. **익스포트** - JSON 파일로 저장
8. **플레이** - 플레이어에서 게임 실행

## 🎮 샘플 게임 | Sample Game

`sample_game.json` 파일에 기본 포켓몬 스타일 게임 예제가 포함되어 있습니다:
- 3가지 속성 타입 (불, 물, 풀)
- 3개의 스킬
- 2개의 아이템
- 3마리의 스타터 몬무

## 🔌 플러그인 개발 | Plugin Development

플러그인을 통해 기능을 확장할 수 있습니다:

```python
# plugins/my_plugin/plugin.py
def on_monmus_create(monmus_data):
    """몬무 생성 시 호출"""
    return monmus_data

def on_skill_use(skill_data, user, target):
    """스킬 사용 시 호출"""
    return skill_data
```

자세한 내용은 `plugins/examples/` 폴더를 참고하세요.

## 🤖 AI 도우미 | AI Assistant

Gemini API를 사용하여 몬무 설명, 스토리 등을 자동 생성할 수 있습니다:

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키 발급
2. 메이커에서 "AI 도우미" 버튼 클릭
3. API 키 입력 후 프롬프트 작성
4. "생성" 버튼으로 콘텐츠 생성

**지원 모델**: gemini-2.0, gemini-2.5 (gemini-1.5는 중단됨)

## 📦 배포 | Deployment

### GitHub Pages (자동)
- `main` 브랜치에 푸시하면 GitHub Actions가 자동으로 배포합니다
- Settings > Pages에서 GitHub Pages 활성화 필요

### Vercel
1. Vercel에 프로젝트 연결
2. Build settings:
   - Framework: Vite
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`

### Netlify
1. Netlify에 프로젝트 연결
2. Build settings:
   - Build Command: `cd frontend && npm run build`
   - Publish Directory: `frontend/dist`

## 🗂️ 프로젝트 구조 | Project Structure

```
textrpgmaker/
├── backend/              # FastAPI 백엔드
│   ├── app.py           # 메인 API 서버
│   └── requirements.txt # Python 의존성
├── frontend/            # React 프론트엔드
│   ├── src/
│   │   ├── components/  # UI 컴포넌트
│   │   ├── pages/       # 페이지 컴포넌트
│   │   ├── store/       # Zustand 상태 관리
│   │   └── utils/       # 유틸리티 (번역 등)
│   ├── package.json
│   └── vite.config.js
├── plugins/             # 플러그인 디렉토리
│   └── examples/        # 예제 플러그인
├── .github/
│   └── workflows/       # GitHub Actions
├── sample_game.json     # 샘플 게임 데이터
├── Dockerfile           # Docker 설정
└── README.md
```

## 🎯 구현된 기능 | Implemented Features

### Core Features
- ✅ 게임 정보 편집기
- ✅ 속성 타입 시스템 (타입 상성 포함)
- ✅ 스킬 편집기
- ✅ 아이템 편집기
- ✅ 몬무 편집기 (스탯, 속성, 진화)
- ✅ JSON 임포트/익스포트
- ✅ 다국어 지원 (한국어, 영어, 일본어)
- ✅ 다크 모드
- ✅ Gemini API 통합
- ✅ 플러그인 시스템
- ✅ 기본 플레이어

### Planned Features
- 🔄 맵 편집기 (노드 기반)
- 🔄 이벤트 편집기 (대화, 전투, 선택지)
- 🔄 NPC 시스템
- 🔄 퀘스트 시스템
- 🔄 전투 시스템 (플레이어)
- 🔄 계약 메커니즘
- 🔄 레벨링 & 진화
- 🔄 인벤토리 관리
- 🔄 저장/불러오기

## 🤝 기여하기 | Contributing

기여를 환영합니다! 다음 방법으로 참여할 수 있습니다:

1. 이슈 리포트
2. 기능 제안
3. 풀 리퀘스트
4. 문서 개선
5. 플러그인 개발

## 📄 라이선스 | License

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 💬 지원 | Support

- 📧 Issues: [GitHub Issues](https://github.com/pokemonrgby-crypto/textrpgmaker/issues)
- 📖 문서: [INSTRUCTIONS_KO.md](INSTRUCTIONS_KO.md) | [INSTRUCTIONS_EN.md](INSTRUCTIONS_EN.md)

## 🙏 감사의 말 | Acknowledgments

- Pokemon 시리즈에서 영감을 받았습니다
- React, FastAPI, Tailwind CSS 등 오픈소스 커뮤니티에 감사드립니다

---

**Made with ❤️ by 텍스트 RPG 메이커 팀**
