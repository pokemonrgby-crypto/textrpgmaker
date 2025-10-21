"""
예제 플러그인
플러그인 시스템 사용 방법을 보여주는 예제
"""

def on_monmus_create(monmus_data):
    """
    몬무 생성 시 호출되는 훅
    몬무 데이터를 수정하거나 추가 처리를 수행할 수 있습니다.
    """
    print(f"새 몬무 생성: {monmus_data.get('name', {}).get('ko', '알 수 없음')}")
    return monmus_data

def on_skill_use(skill_data, user, target):
    """
    스킬 사용 시 호출되는 훅
    스킬 효과를 수정하거나 추가 효과를 적용할 수 있습니다.
    """
    print(f"{user}가 {skill_data.get('name', {}).get('ko', '알 수 없음')}를 사용했습니다.")
    return skill_data
