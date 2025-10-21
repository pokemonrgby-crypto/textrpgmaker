"""
텍스트 RPG 메이커 백엔드 API
FastAPI 기반으로 JSON 임포트/익스포트, Gemini API 통합, 플러그인 지원 제공
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
import json
import yaml
import importlib
import os
from pathlib import Path

# 앱 초기화
app = FastAPI(
    title="텍스트 RPG 메이커 API",
    description="몬무 기반 텍스트 RPG 제작 도구",
    version="1.0.0"
)

# CORS 설정 - 모든 오리진 허용 (개발 환경)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== 데이터 모델 정의 =====

class MultilingualText(BaseModel):
    """다국어 텍스트 모델"""
    ko: str = Field(default="", description="한국어 (기본)")
    en: str = Field(default="", description="영어")
    ja: str = Field(default="", description="일본어")
    
class AttributeType(BaseModel):
    """속성 타입 정의"""
    id: int
    name: MultilingualText
    # 타입 매치업 - 다른 타입에 대한 효과 배율 (1.0 = 보통, 2.0 = 효과적, 0.5 = 비효과적)
    matchups: Dict[int, float] = Field(default_factory=dict)

class Effect(BaseModel):
    """효과 정의 (스킬, 상태이상, 아이템에 사용)"""
    type: str = Field(description="효과 타입 (damage, heal, status, stat_change 등)")
    trigger: str = Field(default="immediate", description="발동 시점")
    value: float = Field(default=0, description="효과 수치")
    target: str = Field(default="opponent", description="대상 (self, opponent, all)")
    duration: int = Field(default=0, description="지속 턴 수")
    metadata: Dict[str, Any] = Field(default_factory=dict)

class Skill(BaseModel):
    """스킬/기술 정의"""
    id: int
    name: MultilingualText
    description: MultilingualText
    attribute_type_id: int = Field(description="속성 타입 ID")
    power: int = Field(default=0, description="위력")
    accuracy: int = Field(default=100, description="명중률 (%)")
    pp: int = Field(default=10, description="PP (사용 횟수)")
    effects: List[Effect] = Field(default_factory=list)

class Item(BaseModel):
    """아이템 정의"""
    id: int
    name: MultilingualText
    description: MultilingualText
    category: str = Field(description="카테고리 (potion, ball, battle, key)")
    usage_context: str = Field(description="사용 가능 상황 (battle, field, both)")
    effects: List[Effect] = Field(default_factory=list)
    price: int = Field(default=0, description="가격")

class MonmusStats(BaseModel):
    """몬무 스탯"""
    hp: int = Field(default=100)
    attack: int = Field(default=50)
    defense: int = Field(default=50)
    sp_attack: int = Field(default=50)
    sp_defense: int = Field(default=50)
    speed: int = Field(default=50)

class EvolutionCondition(BaseModel):
    """진화 조건"""
    type: str = Field(description="조건 타입 (level, item, friendship 등)")
    value: Any = Field(description="조건 값")
    target_monmus_id: int = Field(description="진화 후 몬무 ID")

class Monmus(BaseModel):
    """몬무 정의"""
    id: int
    name: MultilingualText
    description: MultilingualText
    pokedex_number: int = Field(description="도감 번호")
    attribute_types: List[int] = Field(description="속성 타입 ID 리스트 (1~2개)")
    base_stats: MonmusStats
    height: float = Field(default=1.0, description="키 (m)")
    weight: float = Field(default=10.0, description="몸무게 (kg)")
    exp_yield: int = Field(default=100, description="경험치 획득량")
    catch_rate: int = Field(default=45, description="계약 확률")
    learnable_skills: List[Dict[str, Any]] = Field(default_factory=list, description="습득 가능 스킬 (level, skill_id)")
    evolution_conditions: List[EvolutionCondition] = Field(default_factory=list)
    abilities: List[str] = Field(default_factory=list, description="특성 리스트")
    image_url: Optional[str] = Field(default=None, description="이미지 URL")

class MapNode(BaseModel):
    """맵 노드 정의"""
    id: str
    name: MultilingualText
    type: str = Field(description="노드 타입 (field, town, dungeon)")
    connections: List[str] = Field(default_factory=list, description="연결된 노드 ID")
    position: Dict[str, float] = Field(default_factory=dict, description="x, y 좌표")
    encounter_rate: float = Field(default=0.0, description="야생 몬무 조우율")
    wild_monmus: List[Dict[str, Any]] = Field(default_factory=list, description="야생 몬무 (monmus_id, level_range)")
    items: List[Dict[str, Any]] = Field(default_factory=list, description="아이템 드롭 (item_id, probability)")

class EventNode(BaseModel):
    """이벤트 노드 정의"""
    id: str
    type: str = Field(description="이벤트 타입 (dialogue, battle, choice)")
    content: MultilingualText = Field(default_factory=MultilingualText)
    next_nodes: List[str] = Field(default_factory=list, description="다음 이벤트 노드 ID")
    conditions: Dict[str, Any] = Field(default_factory=dict, description="발동 조건")
    metadata: Dict[str, Any] = Field(default_factory=dict)

class NPC(BaseModel):
    """NPC 정의"""
    id: int
    name: MultilingualText
    dialogue: MultilingualText
    type: str = Field(default="generic", description="NPC 타입 (trainer, merchant, quest_giver)")
    party: List[Dict[str, Any]] = Field(default_factory=list, description="보유 몬무 (트레이너인 경우)")
    items_for_sale: List[int] = Field(default_factory=list, description="판매 아이템 ID")
    quests: List[int] = Field(default_factory=list, description="제공 퀘스트 ID")

class Quest(BaseModel):
    """퀘스트 정의"""
    id: int
    title: MultilingualText
    description: MultilingualText
    type: str = Field(default="main", description="퀘스트 타입 (main, side)")
    objectives: List[Dict[str, Any]] = Field(default_factory=list)
    rewards: Dict[str, Any] = Field(default_factory=dict, description="보상 (exp, items, money)")
    required_quest_ids: List[int] = Field(default_factory=list, description="선행 퀘스트 ID")

class GameData(BaseModel):
    """게임 전체 데이터"""
    version: str = Field(default="1.0.0")
    game_title: MultilingualText
    game_description: MultilingualText
    author: str = Field(default="")
    attributes: List[AttributeType] = Field(default_factory=list)
    skills: List[Skill] = Field(default_factory=list)
    items: List[Item] = Field(default_factory=list)
    monmus_list: List[Monmus] = Field(default_factory=list)
    map_nodes: List[MapNode] = Field(default_factory=list)
    events: List[EventNode] = Field(default_factory=list)
    npcs: List[NPC] = Field(default_factory=list)
    quests: List[Quest] = Field(default_factory=list)
    # 게임 설정
    settings: Dict[str, Any] = Field(default_factory=dict)
    
# Gemini API 요청 모델
class GeminiRequest(BaseModel):
    """Gemini API 요청"""
    api_key: str = Field(description="사용자 Gemini API 키")
    prompt: str = Field(description="프롬프트")
    model: str = Field(default="gemini-2.0", description="모델 버전 (gemini-2.0 또는 gemini-2.5)")

# ===== ID 카운터 관리 =====
class IDCounter:
    """자동 ID 할당을 위한 카운터"""
    def __init__(self):
        self.counters = {
            "attributes": 1,
            "skills": 1,
            "items": 1,
            "monmus": 1,
            "npcs": 1,
            "quests": 1,
        }
    
    def get_next(self, entity_type: str) -> int:
        """다음 ID 반환"""
        if entity_type not in self.counters:
            self.counters[entity_type] = 1
        current = self.counters[entity_type]
        self.counters[entity_type] += 1
        return current
    
    def reset(self, entity_type: str, value: int = 1):
        """카운터 리셋"""
        self.counters[entity_type] = value

id_counter = IDCounter()

# ===== 플러그인 로더 =====
class PluginLoader:
    """플러그인 동적 로딩"""
    def __init__(self, plugin_dir: str = "plugins"):
        self.plugin_dir = Path(plugin_dir)
        self.plugins = {}
    
    def load_plugins(self):
        """플러그인 디렉토리에서 플러그인 로드"""
        # 시뮬레이션: 플러그인 디렉토리가 없으면 빈 딕셔너리 반환
        if not self.plugin_dir.exists():
            return {}
        
        # 시뮬레이션: 각 플러그인 폴더를 순회하며 manifest.json 확인
        for plugin_path in self.plugin_dir.iterdir():
            if plugin_path.is_dir():
                manifest_path = plugin_path / "manifest.json"
                if manifest_path.exists():
                    try:
                        with open(manifest_path, 'r', encoding='utf-8') as f:
                            manifest = json.load(f)
                        plugin_name = manifest.get("name", plugin_path.name)
                        self.plugins[plugin_name] = manifest
                    except Exception as e:
                        print(f"플러그인 로드 실패: {plugin_path.name} - {e}")
        
        return self.plugins

plugin_loader = PluginLoader()

# ===== API 엔드포인트 =====

@app.get("/")
async def root():
    """루트 엔드포인트"""
    return {
        "message": "텍스트 RPG 메이커 API에 오신 것을 환영합니다!",
        "version": "1.0.0",
        "endpoints": {
            "게임 데이터 익스포트": "/api/export",
            "게임 데이터 임포트": "/api/import",
            "Gemini API 호출": "/api/gemini/generate",
            "플러그인 목록": "/api/plugins",
            "다음 ID 생성": "/api/id/{entity_type}",
        }
    }

@app.post("/api/export")
async def export_game(game_data: GameData):
    """
    게임 데이터를 JSON으로 익스포트
    시뮬레이션:
    - 정상 케이스: 유효한 GameData 객체 -> JSON 반환
    - 에러 케이스: 잘못된 데이터 형식 -> 400 에러
    """
    try:
        # Pydantic 모델을 딕셔너리로 변환
        data_dict = game_data.model_dump()
        return JSONResponse(content=data_dict)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"익스포트 실패: {str(e)}")

@app.post("/api/import")
async def import_game(file: UploadFile = File(...)):
    """
    JSON 또는 YAML 파일을 임포트하여 게임 데이터 로드
    시뮬레이션:
    - 정상 케이스: 유효한 JSON/YAML -> GameData 반환
    - 에러 케이스 1: 잘못된 파일 형식 -> 400 에러
    - 에러 케이스 2: 파일 파싱 실패 -> 400 에러
    """
    try:
        contents = await file.read()
        
        # 파일 확장자 확인
        if file.filename.endswith('.json'):
            data = json.loads(contents)
        elif file.filename.endswith('.yaml') or file.filename.endswith('.yml'):
            data = yaml.safe_load(contents)
        else:
            raise HTTPException(status_code=400, detail="지원하지 않는 파일 형식입니다. JSON 또는 YAML 파일을 업로드하세요.")
        
        # GameData 모델로 검증
        game_data = GameData(**data)
        
        # ID 카운터 업데이트
        if game_data.attributes:
            max_id = max([attr.id for attr in game_data.attributes], default=0)
            id_counter.reset("attributes", max_id + 1)
        
        if game_data.skills:
            max_id = max([skill.id for skill in game_data.skills], default=0)
            id_counter.reset("skills", max_id + 1)
        
        if game_data.items:
            max_id = max([item.id for item in game_data.items], default=0)
            id_counter.reset("items", max_id + 1)
        
        if game_data.monmus_list:
            max_id = max([monmus.id for monmus in game_data.monmus_list], default=0)
            id_counter.reset("monmus", max_id + 1)
        
        return game_data
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="JSON 파싱 실패. 올바른 JSON 형식인지 확인하세요.")
    except yaml.YAMLError:
        raise HTTPException(status_code=400, detail="YAML 파싱 실패. 올바른 YAML 형식인지 확인하세요.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"임포트 실패: {str(e)}")

@app.post("/api/gemini/generate")
async def generate_with_gemini(request: GeminiRequest):
    """
    Gemini API를 사용하여 콘텐츠 생성
    시뮬레이션:
    - 정상 케이스: 유효한 API 키 + 프롬프트 -> 생성된 텍스트 반환
    - 에러 케이스 1: 잘못된 API 키 -> 401 에러
    - 에러 케이스 2: 빈 프롬프트 -> 400 에러
    - 에러 케이스 3: 지원하지 않는 모델 -> 400 에러
    """
    try:
        # API 키 검증
        if not request.api_key or len(request.api_key) < 10:
            raise HTTPException(status_code=400, detail="유효하지 않은 API 키입니다.")
        
        # 프롬프트 검증
        if not request.prompt or len(request.prompt.strip()) == 0:
            raise HTTPException(status_code=400, detail="프롬프트가 비어있습니다.")
        
        # 모델 버전 검증 (gemini-2.0, gemini-2.5만 지원)
        if request.model not in ["gemini-2.0", "gemini-2.5"]:
            raise HTTPException(
                status_code=400, 
                detail="지원하지 않는 모델입니다. gemini-2.0 또는 gemini-2.5만 사용 가능합니다. (gemini-1.5는 중단되었습니다)"
            )
        
        # Gemini API 호출
        import google.generativeai as genai
        genai.configure(api_key=request.api_key)
        
        model = genai.GenerativeModel(request.model)
        response = model.generate_content(request.prompt)
        
        return {
            "success": True,
            "generated_text": response.text,
            "model": request.model
        }
    
    except ImportError:
        raise HTTPException(
            status_code=500, 
            detail="Gemini API 라이브러리를 찾을 수 없습니다. google-generativeai를 설치하세요."
        )
    except Exception as e:
        # API 키 오류 처리
        if "API_KEY_INVALID" in str(e) or "API key not valid" in str(e):
            raise HTTPException(status_code=401, detail="잘못된 API 키입니다. Gemini API 키를 확인하세요.")
        raise HTTPException(status_code=500, detail=f"Gemini API 호출 실패: {str(e)}")

@app.get("/api/id/{entity_type}")
async def get_next_id(entity_type: str):
    """
    엔티티 타입에 대한 다음 ID 반환
    시뮬레이션:
    - 정상 케이스: 유효한 엔티티 타입 -> 다음 ID 반환
    - 에러 케이스: 알 수 없는 엔티티 타입 -> 새 카운터 생성 후 1 반환
    """
    next_id = id_counter.get_next(entity_type)
    return {"entity_type": entity_type, "next_id": next_id}

@app.get("/api/plugins")
async def list_plugins():
    """
    사용 가능한 플러그인 목록 반환
    시뮬레이션:
    - 정상 케이스: 플러그인 존재 -> 플러그인 목록 반환
    - 빈 케이스: 플러그인 없음 -> 빈 딕셔너리 반환
    """
    plugins = plugin_loader.load_plugins()
    return {"plugins": plugins, "count": len(plugins)}

@app.post("/api/validate")
async def validate_game_data(game_data: GameData):
    """
    게임 데이터 유효성 검증
    시뮬레이션:
    - 정상 케이스: 모든 참조가 유효함 -> 검증 통과
    - 에러 케이스 1: 잘못된 속성 타입 ID 참조 -> 경고 반환
    - 에러 케이스 2: 잘못된 스킬 ID 참조 -> 경고 반환
    """
    warnings = []
    errors = []
    
    # 속성 타입 ID 수집
    attribute_ids = {attr.id for attr in game_data.attributes}
    
    # 스킬 ID 수집
    skill_ids = {skill.id for skill in game_data.skills}
    
    # 아이템 ID 수집
    item_ids = {item.id for item in game_data.items}
    
    # 몬무 검증
    for monmus in game_data.monmus_list:
        # 속성 타입 검증
        for attr_type_id in monmus.attribute_types:
            if attr_type_id not in attribute_ids:
                warnings.append(f"몬무 '{monmus.name.ko}' (ID: {monmus.id})에 존재하지 않는 속성 타입 ID {attr_type_id}가 있습니다.")
        
        # 스킬 검증
        for learnable in monmus.learnable_skills:
            skill_id = learnable.get("skill_id")
            if skill_id and skill_id not in skill_ids:
                warnings.append(f"몬무 '{monmus.name.ko}' (ID: {monmus.id})에 존재하지 않는 스킬 ID {skill_id}가 있습니다.")
    
    # 스킬 검증
    for skill in game_data.skills:
        if skill.attribute_type_id not in attribute_ids:
            warnings.append(f"스킬 '{skill.name.ko}' (ID: {skill.id})에 존재하지 않는 속성 타입 ID {skill.attribute_type_id}가 있습니다.")
    
    return {
        "valid": len(errors) == 0,
        "warnings": warnings,
        "errors": errors
    }

# 서버 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
