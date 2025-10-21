#!/bin/bash
# 프로젝트 검증 스크립트
# Project validation script

echo "=== 텍스트 RPG 메이커 프로젝트 검증 ==="
echo "=== Text RPG Maker Project Validation ==="
echo ""

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 성공/실패 카운터
PASS=0
FAIL=0

# 테스트 함수
test_check() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
        ((PASS++))
    else
        echo -e "${RED}✗ $2${NC}"
        ((FAIL++))
    fi
}

echo "1. 프로젝트 구조 확인..."

# 백엔드 파일 확인
[ -f "backend/app.py" ]
test_check $? "backend/app.py 존재"

[ -f "backend/requirements.txt" ]
test_check $? "backend/requirements.txt 존재"

# 프론트엔드 파일 확인
[ -f "frontend/package.json" ]
test_check $? "frontend/package.json 존재"

[ -f "frontend/vite.config.js" ]
test_check $? "frontend/vite.config.js 존재"

[ -f "frontend/tailwind.config.js" ]
test_check $? "frontend/tailwind.config.js 존재"

# 소스 파일 확인
[ -f "frontend/src/App.jsx" ]
test_check $? "frontend/src/App.jsx 존재"

[ -f "frontend/src/store/gameStore.js" ]
test_check $? "frontend/src/store/gameStore.js 존재"

[ -f "frontend/src/utils/translations.js" ]
test_check $? "frontend/src/utils/translations.js 존재"

# 컴포넌트 확인
[ -f "frontend/src/components/GameInfoEditor.jsx" ]
test_check $? "GameInfoEditor 컴포넌트 존재"

[ -f "frontend/src/components/AttributeEditor.jsx" ]
test_check $? "AttributeEditor 컴포넌트 존재"

[ -f "frontend/src/components/SkillEditor.jsx" ]
test_check $? "SkillEditor 컴포넌트 존재"

[ -f "frontend/src/components/ItemEditor.jsx" ]
test_check $? "ItemEditor 컴포넌트 존재"

[ -f "frontend/src/components/MonmusEditor.jsx" ]
test_check $? "MonmusEditor 컴포넌트 존재"

# 페이지 확인
[ -f "frontend/src/pages/HomePage.jsx" ]
test_check $? "HomePage 페이지 존재"

[ -f "frontend/src/pages/MakerPage.jsx" ]
test_check $? "MakerPage 페이지 존재"

[ -f "frontend/src/pages/PlayerPage.jsx" ]
test_check $? "PlayerPage 페이지 존재"

echo ""
echo "2. 설정 파일 확인..."

[ -f "Dockerfile" ]
test_check $? "Dockerfile 존재"

[ -f ".github/workflows/deploy.yml" ]
test_check $? "GitHub Actions 워크플로우 존재"

[ -f ".gitignore" ]
test_check $? ".gitignore 존재"

echo ""
echo "3. 문서 확인..."

[ -f "README.md" ]
test_check $? "README.md 존재"

[ -f "INSTRUCTIONS_KO.md" ]
test_check $? "한국어 사용 설명서 존재"

[ -f "INSTRUCTIONS_EN.md" ]
test_check $? "영어 사용 설명서 존재"

echo ""
echo "4. 샘플 & 플러그인 확인..."

[ -f "sample_game.json" ]
test_check $? "샘플 게임 JSON 존재"

[ -f "plugins/examples/manifest.json" ]
test_check $? "플러그인 manifest.json 존재"

[ -f "plugins/examples/plugin.py" ]
test_check $? "플러그인 plugin.py 존재"

echo ""
echo "5. Python 코드 문법 확인..."

python3 -m py_compile backend/app.py 2>/dev/null
test_check $? "backend/app.py 문법 검사"

python3 -m py_compile plugins/examples/plugin.py 2>/dev/null
test_check $? "plugins/examples/plugin.py 문법 검사"

echo ""
echo "6. JSON 파일 유효성 확인..."

python3 -c "import json; json.load(open('sample_game.json'))" 2>/dev/null
test_check $? "sample_game.json 유효성 검사"

python3 -c "import json; json.load(open('plugins/examples/manifest.json'))" 2>/dev/null
test_check $? "manifest.json 유효성 검사"

python3 -c "import json; json.load(open('frontend/package.json'))" 2>/dev/null
test_check $? "package.json 유효성 검사"

echo ""
echo "7. 다국어 지원 확인..."

# translations.js에 한국어, 영어, 일본어가 모두 있는지 확인
grep -q "ko:" frontend/src/utils/translations.js
test_check $? "한국어 번역 존재"

grep -q "en:" frontend/src/utils/translations.js
test_check $? "영어 번역 존재"

grep -q "ja:" frontend/src/utils/translations.js
test_check $? "일본어 번역 존재"

echo ""
echo "=== 검증 결과 ==="
echo "=== Validation Results ==="
echo -e "${GREEN}통과: $PASS${NC}"
echo -e "${RED}실패: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ 모든 검증 통과!${NC}"
    echo -e "${GREEN}✓ All validations passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ 일부 검증 실패${NC}"
    echo -e "${RED}✗ Some validations failed${NC}"
    exit 1
fi
