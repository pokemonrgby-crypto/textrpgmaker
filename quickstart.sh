#!/bin/bash
# 텍스트 RPG 메이커 빠른 시작 스크립트
# Text RPG Maker Quick Start Script

set -e

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║       텍스트 RPG 메이커 빠른 시작                     ║"
echo "║       Text RPG Maker Quick Start                      ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# 시스템 요구사항 확인
echo -e "${YELLOW}1. 시스템 요구사항 확인 중...${NC}"

# Python 확인
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    echo -e "${GREEN}✓ Python $PYTHON_VERSION 발견${NC}"
else
    echo -e "${RED}✗ Python 3이 설치되어 있지 않습니다.${NC}"
    echo "https://www.python.org/downloads/ 에서 다운로드하세요."
    exit 1
fi

# Node.js 확인
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js $NODE_VERSION 발견${NC}"
else
    echo -e "${RED}✗ Node.js가 설치되어 있지 않습니다.${NC}"
    echo "https://nodejs.org/ 에서 다운로드하세요."
    exit 1
fi

# npm 확인
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm $NPM_VERSION 발견${NC}"
else
    echo -e "${RED}✗ npm이 설치되어 있지 않습니다.${NC}"
    exit 1
fi

echo ""

# 백엔드 설정
echo -e "${YELLOW}2. 백엔드 설정 중...${NC}"
cd backend

# 가상환경이 있으면 사용
if [ -d "venv" ]; then
    echo "기존 가상환경 사용"
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null || true
else
    echo "가상환경 생성 중..."
    python3 -m venv venv
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null || true
fi

echo "백엔드 의존성 설치 중..."
pip install -q -r requirements.txt

echo -e "${GREEN}✓ 백엔드 설정 완료${NC}"
cd ..

echo ""

# 프론트엔드 설정
echo -e "${YELLOW}3. 프론트엔드 설정 중...${NC}"
cd frontend

if [ -d "node_modules" ]; then
    echo "node_modules가 이미 존재합니다."
else
    echo "프론트엔드 의존성 설치 중... (시간이 걸릴 수 있습니다)"
    npm install --silent
fi

echo -e "${GREEN}✓ 프론트엔드 설정 완료${NC}"
cd ..

echo ""

# 서버 시작 옵션
echo -e "${BLUE}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          설정 완료! 서버를 시작하세요.                ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""
echo "다음 명령어로 서버를 시작할 수 있습니다:"
echo ""
echo -e "${GREEN}백엔드 서버 (터미널 1):${NC}"
echo "  cd backend"
echo "  python app.py"
echo ""
echo -e "${GREEN}프론트엔드 서버 (터미널 2):${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo -e "${BLUE}또는 다음 명령어로 자동 실행:${NC}"
echo "  bash run_servers.sh"
echo ""
echo -e "${YELLOW}브라우저에서 다음 주소로 접속하세요:${NC}"
echo "  프론트엔드: http://localhost:3000"
echo "  백엔드 API: http://localhost:8000"
echo "  API 문서: http://localhost:8000/docs"
echo ""
echo -e "${GREEN}즐거운 게임 제작 되세요! 🎮${NC}"
