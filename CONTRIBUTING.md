# 기여 가이드 | Contributing Guide

텍스트 RPG 메이커 프로젝트에 기여해 주셔서 감사합니다! 🎉
Thank you for contributing to Text RPG Maker! 🎉

## 기여 방법 | How to Contribute

### 이슈 리포트 | Issue Reports

버그를 발견하거나 새로운 기능을 제안하고 싶으신가요?
Found a bug or want to suggest a new feature?

1. **기존 이슈 확인 | Check Existing Issues**
   - 중복을 피하기 위해 먼저 기존 이슈를 확인하세요
   - Check existing issues to avoid duplicates

2. **새 이슈 생성 | Create New Issue**
   - [이슈 페이지](https://github.com/pokemonrgby-crypto/textrpgmaker/issues)에서 "New Issue" 클릭
   - 명확하고 상세한 제목과 설명 작성
   - 재현 단계, 스크린샷 등 포함

### 풀 리퀘스트 | Pull Requests

코드 기여를 환영합니다! 다음 단계를 따라주세요:
We welcome code contributions! Follow these steps:

#### 1. Fork & Clone
```bash
# 레포지토리 Fork
# 자신의 GitHub 계정으로 Fork

# Clone
git clone https://github.com/YOUR_USERNAME/textrpgmaker.git
cd textrpgmaker
```

#### 2. 브랜치 생성 | Create Branch
```bash
# feature/, bugfix/, docs/ 등의 접두사 사용
git checkout -b feature/your-feature-name
```

#### 3. 개발 | Development

**코딩 규칙 | Coding Standards:**

##### Python (백엔드)
- PEP 8 스타일 가이드 준수
- 한국어 주석 사용 (중요 부분)
- Type hints 사용 권장
- Docstring 작성

```python
def create_monmus(monmus_data: dict) -> dict:
    """
    새로운 몬무를 생성합니다.
    Create a new Monmus.
    
    Args:
        monmus_data: 몬무 데이터 딕셔너리
    
    Returns:
        생성된 몬무 데이터
    """
    # 구현...
    pass
```

##### JavaScript/React (프론트엔드)
- ESLint 규칙 준수
- 컴포넌트에 JSDoc 주석 추가
- 한국어 주석 (중요 부분)
- 함수형 컴포넌트 사용

```javascript
/**
 * 몬무 편집기 컴포넌트
 * Monmus Editor Component
 */
function MonmusEditor() {
  // 구현...
}
```

#### 4. 테스트 | Testing

변경 사항을 테스트하세요:
Test your changes:

```bash
# 백엔드 테스트
cd backend
python -m pytest

# 프론트엔드 빌드 테스트
cd frontend
npm run build

# 검증 스크립트 실행
bash validate.sh
```

#### 5. 커밋 | Commit

**커밋 메시지 컨벤션 | Commit Message Convention:**

```
<type>: <subject>

<body> (선택사항)
```

**Type:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 (포맷팅 등)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 기타 변경

**예시 | Examples:**
```bash
feat: Add skill level system
fix: Resolve JSON import error
docs: Update Korean installation guide
```

#### 6. Push & PR

```bash
# Push
git push origin feature/your-feature-name

# GitHub에서 Pull Request 생성
# Create Pull Request on GitHub
```

**PR 설명에 포함할 내용 | What to Include in PR Description:**
- 변경 사항 요약
- 관련 이슈 번호 (#123)
- 스크린샷 (UI 변경 시)
- 테스트 결과

## 개발 가이드라인 | Development Guidelines

### 다국어 지원 | Multilingual Support

모든 사용자 대면 텍스트는 다국어를 지원해야 합니다:
All user-facing text should support multiple languages:

```javascript
// ✅ Good
const text = {
  ko: "몬무 추가",
  en: "Add Monmus",
  ja: "モンムス追加"
};

// ❌ Bad
const text = "Add Monmus";
```

### 접근성 | Accessibility

- 시맨틱 HTML 사용
- ARIA 레이블 추가
- 키보드 네비게이션 지원
- 충분한 색상 대비

### 성능 | Performance

- 불필요한 리렌더링 최소화
- 큰 리스트는 가상화 사용
- 이미지 최적화
- 코드 스플리팅

### 보안 | Security

- 사용자 입력 검증
- XSS 방어
- API 키 노출 방지
- CORS 적절히 설정

## 플러그인 개발 | Plugin Development

플러그인을 개발하여 기능을 확장할 수 있습니다:
You can extend functionality by developing plugins:

### 플러그인 구조 | Plugin Structure

```
plugins/
  your_plugin/
    manifest.json
    plugin.py
    README.md
```

### manifest.json

```json
{
  "name": "your_plugin",
  "version": "1.0.0",
  "description": {
    "ko": "플러그인 설명",
    "en": "Plugin description",
    "ja": "プラグイン説明"
  },
  "author": "Your Name",
  "hooks": [
    "on_monmus_create",
    "on_skill_use"
  ],
  "main": "plugin.py"
}
```

### plugin.py

```python
"""
플러그인 설명
Plugin Description
"""

def on_monmus_create(monmus_data):
    """몬무 생성 시 호출"""
    # 커스텀 로직
    return monmus_data

def on_skill_use(skill_data, user, target):
    """스킬 사용 시 호출"""
    # 커스텀 로직
    return skill_data
```

## 코드 리뷰 | Code Review

모든 PR은 리뷰를 거칩니다:
All PRs go through review:

- 코드 품질
- 테스트 커버리지
- 문서화
- 성능
- 보안

리뷰어의 피드백에 적극적으로 응답해 주세요!
Please respond actively to reviewer feedback!

## 커뮤니티 규칙 | Community Guidelines

### 행동 강령 | Code of Conduct

- 존중과 배려
- 건설적인 피드백
- 다양성 존중
- 괴롭힘 금지

### 의사소통 | Communication

- 한국어 또는 영어 사용
- 명확하고 친절하게
- 적시에 응답
- 질문 환영

## 인정 | Recognition

기여자는 다음과 같이 인정받습니다:
Contributors are recognized in:

- README의 Contributors 섹션
- 릴리스 노트
- 커밋 히스토리

## 질문이 있으신가요? | Questions?

- **이슈**: https://github.com/pokemonrgby-crypto/textrpgmaker/issues
- **토론**: https://github.com/pokemonrgby-crypto/textrpgmaker/discussions

---

**함께 만들어가는 텍스트 RPG 메이커! | Building Text RPG Maker Together! 🎮**
