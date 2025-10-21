# 설치 및 설정 가이드 | Setup Guide

## 시스템 요구사항 | System Requirements

### 개발 환경 | Development Environment
- **Python**: 3.11 이상 | 3.11 or higher
- **Node.js**: 18 이상 | 18 or higher
- **npm**: 9 이상 | 9 or higher
- **Git**: 최신 버전 | Latest version

### 배포 환경 | Deployment Environment
- **Docker**: 20.10 이상 (선택사항) | 20.10 or higher (optional)
- **GitHub Account**: GitHub Pages 또는 Actions 사용 시 | For GitHub Pages or Actions

## 설치 방법 | Installation Methods

### 방법 1: 로컬 개발 설정 | Method 1: Local Development Setup

#### 1단계: 레포지토리 클론 | Step 1: Clone Repository
```bash
git clone https://github.com/pokemonrgby-crypto/textrpgmaker.git
cd textrpgmaker
```

#### 2단계: 백엔드 설정 | Step 2: Setup Backend

##### Python 가상환경 생성 (권장) | Create Python Virtual Environment (Recommended)
```bash
cd backend
python3 -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

##### 의존성 설치 | Install Dependencies
```bash
pip install -r requirements.txt
```

##### 백엔드 서버 실행 | Run Backend Server
```bash
python app.py
```

백엔드는 `http://localhost:8000`에서 실행됩니다.
Backend runs at `http://localhost:8000`.

API 문서는 `http://localhost:8000/docs`에서 확인할 수 있습니다.
API documentation available at `http://localhost:8000/docs`.

#### 3단계: 프론트엔드 설정 | Step 3: Setup Frontend

새 터미널을 열고 | Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.
Frontend runs at `http://localhost:3000`.

### 방법 2: Docker 사용 | Method 2: Using Docker

#### Docker 이미지 빌드 | Build Docker Image
```bash
docker build -t textrpg-maker .
```

#### 컨테이너 실행 | Run Container
```bash
docker run -p 8000:8000 textrpg-maker
```

애플리케이션이 `http://localhost:8000`에서 실행됩니다.
Application runs at `http://localhost:8000`.

### 방법 3: 프로덕션 빌드 | Method 3: Production Build

#### 프론트엔드 빌드 | Build Frontend
```bash
cd frontend
npm install
npm run build
```

빌드된 파일은 `frontend/dist/` 폴더에 생성됩니다.
Built files are generated in `frontend/dist/` folder.

#### 정적 파일 서빙 | Serve Static Files

Python의 간단한 HTTP 서버 사용:
Using Python's simple HTTP server:

```bash
cd frontend/dist
python3 -m http.server 3000
```

## 환경 변수 설정 | Environment Variables

### 백엔드 환경 변수 | Backend Environment Variables

`.env` 파일을 `backend/` 디렉토리에 생성:
Create `.env` file in `backend/` directory:

```env
# 서버 설정 | Server Configuration
HOST=0.0.0.0
PORT=8000

# CORS 설정 | CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Gemini API (선택사항) | Gemini API (Optional)
DEFAULT_GEMINI_MODEL=gemini-2.0
```

### 프론트엔드 환경 변수 | Frontend Environment Variables

`.env` 파일을 `frontend/` 디렉토리에 생성:
Create `.env` file in `frontend/` directory:

```env
# API 엔드포인트 | API Endpoint
VITE_API_URL=http://localhost:8000
```

## 배포 | Deployment

### GitHub Pages 배포 | Deploy to GitHub Pages

1. **GitHub Actions 활성화 | Enable GitHub Actions**
   - Repository Settings > Actions > General
   - "Allow all actions and reusable workflows" 선택

2. **GitHub Pages 설정 | Configure GitHub Pages**
   - Repository Settings > Pages
   - Source: "GitHub Actions" 선택

3. **코드 푸시 | Push Code**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **자동 배포 | Automatic Deployment**
   - `main` 브랜치에 푸시하면 자동으로 배포됩니다
   - GitHub Actions 탭에서 배포 상태 확인 가능

### Vercel 배포 | Deploy to Vercel

1. **Vercel에 프로젝트 연결 | Connect Project to Vercel**
   - [vercel.com](https://vercel.com)에서 "New Project" 클릭
   - GitHub 레포지토리 선택

2. **빌드 설정 | Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

3. **배포 | Deploy**
   - "Deploy" 버튼 클릭
   - 자동으로 빌드 및 배포됩니다

### Netlify 배포 | Deploy to Netlify

1. **Netlify에 프로젝트 연결 | Connect Project to Netlify**
   - [netlify.com](https://netlify.com)에서 "New site from Git" 클릭
   - GitHub 레포지토리 선택

2. **빌드 설정 | Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

3. **배포 | Deploy**
   - "Deploy site" 버튼 클릭

## 개발 팁 | Development Tips

### 핫 리로드 개발 | Hot Reload Development

프론트엔드와 백엔드를 동시에 실행하면 코드 변경 시 자동으로 새로고침됩니다:
Run frontend and backend simultaneously for automatic refresh on code changes:

```bash
# 터미널 1 | Terminal 1
cd backend && python app.py

# 터미널 2 | Terminal 2
cd frontend && npm run dev
```

### API 테스트 | API Testing

FastAPI는 자동으로 API 문서를 생성합니다:
FastAPI automatically generates API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 디버깅 | Debugging

#### 백엔드 디버깅 | Backend Debugging
```bash
# 개발 모드로 실행 (자동 재시작)
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

#### 프론트엔드 디버깅 | Frontend Debugging
- 브라우저 개발자 도구 (F12) 사용
- React Developer Tools 설치 권장

### 코드 스타일 | Code Style

#### Python (백엔드) | Python (Backend)
```bash
# 코드 포맷팅
black backend/

# 타입 체크
mypy backend/
```

#### JavaScript/React (프론트엔드) | JavaScript/React (Frontend)
```bash
# 코드 포맷팅
npm run format

# 린팅
npm run lint
```

## 문제 해결 | Troubleshooting

### 백엔드 문제 | Backend Issues

#### 모듈을 찾을 수 없음 | Module Not Found
```bash
# 가상환경이 활성화되어 있는지 확인
# Check if virtual environment is activated
pip list

# 의존성 재설치
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

#### 포트가 이미 사용 중 | Port Already in Use
```bash
# 다른 포트로 실행
uvicorn app:app --port 8001
```

### 프론트엔드 문제 | Frontend Issues

#### 빌드 실패 | Build Failed
```bash
# node_modules 삭제 후 재설치
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### API 연결 실패 | API Connection Failed
- 백엔드 서버가 실행 중인지 확인
- CORS 설정 확인
- 브라우저 콘솔에서 에러 메시지 확인

### Docker 문제 | Docker Issues

#### 빌드 실패 | Build Failed
```bash
# 캐시 없이 빌드
docker build --no-cache -t textrpg-maker .
```

#### 컨테이너가 시작되지 않음 | Container Won't Start
```bash
# 로그 확인
docker logs <container_id>

# 컨테이너 내부 접근
docker exec -it <container_id> /bin/bash
```

## 추가 리소스 | Additional Resources

- **FastAPI 문서**: https://fastapi.tiangolo.com/
- **React 문서**: https://react.dev/
- **Vite 문서**: https://vitejs.dev/
- **Tailwind CSS 문서**: https://tailwindcss.com/
- **Gemini API 문서**: https://ai.google.dev/

## 지원 | Support

문제가 발생하면 다음 방법으로 도움을 받을 수 있습니다:
If you encounter issues, get help through:

- **GitHub Issues**: https://github.com/pokemonrgby-crypto/textrpgmaker/issues
- **사용 설명서**: [INSTRUCTIONS_KO.md](INSTRUCTIONS_KO.md) | [INSTRUCTIONS_EN.md](INSTRUCTIONS_EN.md)
- **샘플 게임**: `sample_game.json` 참고

---

**Happy Coding! 즐거운 개발 되세요! 🎮**
