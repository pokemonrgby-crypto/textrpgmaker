#!/bin/bash
# 백엔드와 프론트엔드 서버를 동시에 실행하는 스크립트
# Script to run backend and frontend servers simultaneously

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}텍스트 RPG 메이커 서버 시작 중...${NC}"

# 백엔드 서버 시작
echo -e "${YELLOW}백엔드 서버 시작 중...${NC}"
cd backend

# 가상환경 활성화 (있으면)
if [ -d "venv" ]; then
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null || true
fi

# 백엔드를 백그라운드로 실행
python app.py &
BACKEND_PID=$!
echo -e "${GREEN}✓ 백엔드 서버 시작됨 (PID: $BACKEND_PID)${NC}"

cd ..

# 백엔드 시작 대기
sleep 3

# 프론트엔드 서버 시작
echo -e "${YELLOW}프론트엔드 서버 시작 중...${NC}"
cd frontend

# 프론트엔드를 백그라운드로 실행
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ 프론트엔드 서버 시작됨 (PID: $FRONTEND_PID)${NC}"

cd ..

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║             서버가 성공적으로 시작되었습니다!          ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}접속 주소:${NC}"
echo "  프론트엔드: http://localhost:3000"
echo "  백엔드 API: http://localhost:8000"
echo "  API 문서: http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}종료하려면 Ctrl+C를 누르세요${NC}"
echo ""

# Cleanup 함수
cleanup() {
    echo ""
    echo -e "${YELLOW}서버를 종료 중...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✓ 모든 서버가 종료되었습니다${NC}"
    exit 0
}

# SIGINT (Ctrl+C) 트랩
trap cleanup SIGINT SIGTERM

# 서버가 실행되는 동안 대기
wait
