# 텍스트 RPG 메이커 - 사용 설명서 (한국어)

## 개요
텍스트 RPG 메이커는 코딩 지식 없이도 포켓몬 스타일의 몬무(Monster Girls) 기반 텍스트 RPG를 만들 수 있는 웹 애플리케이션입니다.

## 주요 기능
- 🎮 **직관적인 웹 인터페이스**: 코딩 없이 게임 제작
- 🌏 **다국어 지원**: 한국어(기본), 영어, 일본어
- 📦 **JSON 임포트/익스포트**: 단일 파일로 게임 저장 및 공유
- 🤖 **AI 도우미**: Gemini API를 통한 콘텐츠 생성
- 🔌 **플러그인 시스템**: 기능 확장 가능

## 설치 방법

### 1. 로컬 개발 환경

#### 백엔드 설정
```bash
# 백엔드 디렉토리로 이동
cd backend

# 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python app.py
```

백엔드 서버는 http://localhost:8000 에서 실행됩니다.

#### 프론트엔드 설정
```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드는 http://localhost:3000 에서 실행됩니다.

### 2. Docker 사용
```bash
# Docker 이미지 빌드
docker build -t textrpg-maker .

# 컨테이너 실행
docker run -p 8000:8000 textrpg-maker
```

## 사용 방법

### 1. 게임 정보 설정
- 메이커 탭에서 "게임 정보"를 선택합니다.
- 게임 타이틀, 설명, 제작자 정보를 입력합니다.
- 한국어, 영어, 일본어로 입력할 수 있습니다.

### 2. 속성 타입 정의
- "속성" 탭에서 게임에 사용할 속성(예: 불, 물, 풀)을 추가합니다.
- 타입 상성표를 설정하여 전투 밸런스를 조정합니다.
  - 1.0 = 보통 효과
  - 2.0 = 효과적
  - 0.5 = 비효과적

### 3. 스킬 생성
- "스킬" 탭에서 몬무가 사용할 기술을 만듭니다.
- 위력, 명중률, PP(사용 횟수)를 설정합니다.
- 속성 타입을 지정합니다.

### 4. 아이템 추가
- "아이템" 탭에서 게임 내 아이템을 추가합니다.
- 카테고리(포션, 계약구, 배틀, 키 아이템)를 선택합니다.
- 사용 상황(배틀, 필드, 양쪽)을 지정합니다.

### 5. 몬무 제작
- "몬무" 탭에서 캐릭터를 만듭니다.
- 기본 스탯(HP, 공격, 방어, 특수공격, 특수방어, 스피드)을 설정합니다.
- 속성 타입을 1~2개 선택합니다.
- 도감 번호, 키, 몸무게 등의 상세 정보를 입력합니다.

### 6. 익스포트 & 플레이
- 모든 설정이 완료되면 "익스포트" 버튼을 클릭하여 JSON 파일로 저장합니다.
- 플레이어 탭에서 저장한 JSON 파일을 불러와 게임을 플레이할 수 있습니다.

## AI 도우미 사용 (선택사항)

### Gemini API 키 설정
1. [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키를 발급받습니다.
2. 메이커에서 "AI 도우미" 버튼을 클릭합니다.
3. API 키를 입력하고 원하는 프롬프트를 작성합니다.
4. "생성" 버튼을 클릭하면 AI가 콘텐츠를 생성합니다.

### 지원 모델
- gemini-2.0
- gemini-2.5

**참고**: gemini-1.5는 중단되었습니다.

## 플러그인 개발

### 플러그인 구조
```
plugins/
  my_plugin/
    manifest.json
    plugin.py
```

### manifest.json 예제
```json
{
  "name": "my_plugin",
  "version": "1.0.0",
  "description": {
    "ko": "내 플러그인",
    "en": "My Plugin",
    "ja": "マイプラグイン"
  },
  "author": "제작자 이름",
  "hooks": [
    "on_monmus_create",
    "on_skill_use"
  ],
  "main": "plugin.py"
}
```

### plugin.py 예제
```python
def on_monmus_create(monmus_data):
    """몬무 생성 시 호출"""
    # 커스텀 로직 추가
    return monmus_data

def on_skill_use(skill_data, user, target):
    """스킬 사용 시 호출"""
    # 커스텀 로직 추가
    return skill_data
```

## 배포

### GitHub Pages (정적 호스팅)
1. 프론트엔드를 빌드합니다: `npm run build`
2. `dist` 폴더를 GitHub Pages에 배포합니다.
3. GitHub Actions 워크플로우가 자동으로 배포를 처리합니다.

### Vercel/Netlify (동적 호스팅)
1. 프로젝트를 GitHub에 푸시합니다.
2. Vercel 또는 Netlify에서 프로젝트를 연결합니다.
3. 빌드 설정:
   - Build command: `npm run build`
   - Output directory: `dist`

## 문제 해결

### 백엔드 API 연결 실패
- 백엔드 서버가 실행 중인지 확인하세요.
- CORS 설정이 올바른지 확인하세요.

### JSON 임포트 오류
- JSON 파일 형식이 올바른지 확인하세요.
- 모든 필수 필드가 포함되어 있는지 확인하세요.

### Gemini API 오류
- API 키가 유효한지 확인하세요.
- 지원되는 모델(gemini-2.0, gemini-2.5)을 사용하고 있는지 확인하세요.

## 기여하기
이슈 리포트, 풀 리퀘스트, 피드백을 환영합니다!

## 라이선스
MIT License

## 지원
문의사항이 있으시면 GitHub Issues를 통해 문의해주세요.
