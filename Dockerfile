# 멀티 스테이지 빌드
# 프론트엔드 빌드
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# 백엔드 이미지
FROM python:3.11-slim
WORKDIR /app

# 백엔드 의존성 설치
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 백엔드 코드 복사
COPY backend/ ./

# 프론트엔드 빌드 결과 복사
COPY --from=frontend-build /app/frontend/dist ./static

# 포트 노출
EXPOSE 8000

# 서버 실행
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
