/**
 * 속성 타입 편집기
 * 속성 타입 추가, 수정, 삭제 및 타입 상성 설정
 */
import React, { useState } from 'react';
import axios from 'axios';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

function AttributeEditor() {
  const {
    attributes,
    addAttribute,
    updateAttribute,
    deleteAttribute,
    currentLanguage,
  } = useGameStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentAttr, setCurrentAttr] = useState(null);
  const [formData, setFormData] = useState({
    name: { ko: '', en: '', ja: '' },
    matchups: {},
  });
  
  // ID 가져오기
  const getNextId = async () => {
    try {
      const response = await axios.get('/api/id/attributes');
      return response.data.next_id;
    } catch {
      return attributes.length > 0 ? Math.max(...attributes.map(a => a.id)) + 1 : 1;
    }
  };
  
  // 새 속성 추가 모드
  const handleAdd = () => {
    setIsEditing(true);
    setCurrentAttr(null);
    setFormData({
      name: { ko: '', en: '', ja: '' },
      matchups: {},
    });
  };
  
  // 속성 편집 모드
  const handleEdit = (attr) => {
    setIsEditing(true);
    setCurrentAttr(attr);
    setFormData({
      name: attr.name,
      matchups: attr.matchups || {},
    });
  };
  
  // 저장
  const handleSave = async () => {
    // 시뮬레이션: 빈 이름 체크
    if (!formData.name.ko.trim()) {
      alert('한국어 이름은 필수입니다.');
      return;
    }
    
    if (currentAttr) {
      // 수정
      updateAttribute(currentAttr.id, formData);
    } else {
      // 추가
      const nextId = await getNextId();
      addAttribute({
        id: nextId,
        ...formData,
      });
    }
    
    setIsEditing(false);
    setCurrentAttr(null);
  };
  
  // 취소
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentAttr(null);
  };
  
  // 삭제
  const handleDelete = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteAttribute(id);
    }
  };
  
  // 상성 설정
  const handleMatchupChange = (targetId, value) => {
    setFormData({
      ...formData,
      matchups: {
        ...formData.matchups,
        [targetId]: parseFloat(value) || 1.0,
      },
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">
          속성 타입 관리
        </h2>
        {!isEditing && (
          <button onClick={handleAdd} className="btn btn-primary">
            + {t('add', currentLanguage)}
          </button>
        )}
      </div>
      
      {isEditing ? (
        // 편집 폼
        <div className="card">
          <h3 className="text-xl font-bold mb-4 dark:text-white">
            {currentAttr ? '속성 수정' : '새 속성 추가'}
          </h3>
          
          {/* 이름 입력 */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="label">{t('korean', currentLanguage)} *</label>
              <input
                type="text"
                value={formData.name.ko}
                onChange={(e) => setFormData({
                  ...formData,
                  name: { ...formData.name, ko: e.target.value }
                })}
                className="input-field"
                placeholder="불"
              />
            </div>
            <div>
              <label className="label">{t('english', currentLanguage)}</label>
              <input
                type="text"
                value={formData.name.en}
                onChange={(e) => setFormData({
                  ...formData,
                  name: { ...formData.name, en: e.target.value }
                })}
                className="input-field"
                placeholder="Fire"
              />
            </div>
            <div>
              <label className="label">{t('japanese', currentLanguage)}</label>
              <input
                type="text"
                value={formData.name.ja}
                onChange={(e) => setFormData({
                  ...formData,
                  name: { ...formData.name, ja: e.target.value }
                })}
                className="input-field"
                placeholder="ほのお"
              />
            </div>
          </div>
          
          {/* 타입 상성 설정 */}
          {attributes.length > 0 && (
            <div className="mb-6">
              <label className="label">타입 상성 설정</label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                이 속성이 다른 속성에 대해 가지는 효과 배율 (1.0 = 보통, 2.0 = 효과적, 0.5 = 비효과적)
              </p>
              <div className="space-y-2">
                {attributes.map((attr) => (
                  <div key={attr.id} className="flex items-center space-x-3">
                    <span className="w-32 text-sm dark:text-gray-300">{attr.name.ko}</span>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.matchups[attr.id] || 1.0}
                      onChange={(e) => handleMatchupChange(attr.id, e.target.value)}
                      className="input-field w-24"
                    />
                    <span className="text-sm text-gray-500">배</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button onClick={handleSave} className="btn btn-primary">
              {t('save', currentLanguage)}
            </button>
            <button onClick={handleCancel} className="btn bg-gray-500 text-white hover:bg-gray-600">
              {t('cancel', currentLanguage)}
            </button>
          </div>
        </div>
      ) : (
        // 리스트
        <div>
          {attributes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>아직 속성이 없습니다. 첫 속성을 추가해보세요!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {attributes.map((attr) => (
                <div key={attr.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold dark:text-white">
                      {attr.name[currentLanguage] || attr.name.ko}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {attr.id}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(attr)}
                      className="btn bg-blue-500 text-white hover:bg-blue-600 text-sm flex-1"
                    >
                      {t('edit', currentLanguage)}
                    </button>
                    <button
                      onClick={() => handleDelete(attr.id)}
                      className="btn bg-red-500 text-white hover:bg-red-600 text-sm flex-1"
                    >
                      {t('delete', currentLanguage)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AttributeEditor;
