/**
 * 스킬 편집기
 * 스킬 추가, 수정, 삭제
 */
import React, { useState } from 'react';
import axios from 'axios';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

function SkillEditor() {
  const {
    skills,
    attributes,
    addSkill,
    updateSkill,
    deleteSkill,
    currentLanguage,
  } = useGameStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: { ko: '', en: '', ja: '' },
    description: { ko: '', en: '', ja: '' },
    attribute_type_id: 1,
    power: 50,
    accuracy: 100,
    pp: 10,
    effects: [],
  });
  
  // ID 가져오기
  const getNextId = async () => {
    try {
      const response = await axios.get('/api/id/skills');
      return response.data.next_id;
    } catch {
      return skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
    }
  };
  
  // 추가 모드
  const handleAdd = () => {
    setIsEditing(true);
    setCurrentSkill(null);
    setFormData({
      name: { ko: '', en: '', ja: '' },
      description: { ko: '', en: '', ja: '' },
      attribute_type_id: attributes.length > 0 ? attributes[0].id : 1,
      power: 50,
      accuracy: 100,
      pp: 10,
      effects: [],
    });
  };
  
  // 편집 모드
  const handleEdit = (skill) => {
    setIsEditing(true);
    setCurrentSkill(skill);
    setFormData({
      name: skill.name,
      description: skill.description,
      attribute_type_id: skill.attribute_type_id,
      power: skill.power,
      accuracy: skill.accuracy,
      pp: skill.pp,
      effects: skill.effects || [],
    });
  };
  
  // 저장
  const handleSave = async () => {
    if (!formData.name.ko.trim()) {
      alert('한국어 이름은 필수입니다.');
      return;
    }
    
    if (currentSkill) {
      updateSkill(currentSkill.id, formData);
    } else {
      const nextId = await getNextId();
      addSkill({
        id: nextId,
        ...formData,
      });
    }
    
    setIsEditing(false);
    setCurrentSkill(null);
  };
  
  // 취소
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentSkill(null);
  };
  
  // 삭제
  const handleDelete = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteSkill(id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">
          스킬 관리
        </h2>
        {!isEditing && (
          <button onClick={handleAdd} className="btn btn-primary">
            + {t('add', currentLanguage)}
          </button>
        )}
      </div>
      
      {attributes.length === 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ 먼저 속성 타입을 추가해주세요.
          </p>
        </div>
      )}
      
      {isEditing ? (
        // 편집 폼
        <div className="card">
          <h3 className="text-xl font-bold mb-4 dark:text-white">
            {currentSkill ? '스킬 수정' : '새 스킬 추가'}
          </h3>
          
          {/* 이름 */}
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
                placeholder="불꽃"
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
                placeholder="Ember"
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
                placeholder="ひのこ"
              />
            </div>
          </div>
          
          {/* 설명 */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="label">설명 ({t('korean', currentLanguage)})</label>
              <textarea
                value={formData.description.ko}
                onChange={(e) => setFormData({
                  ...formData,
                  description: { ...formData.description, ko: e.target.value }
                })}
                className="input-field"
                rows="2"
                placeholder="작은 불꽃을 발사하여 공격한다."
              />
            </div>
          </div>
          
          {/* 속성 타입 */}
          <div className="mb-6">
            <label className="label">{t('attributeType', currentLanguage)}</label>
            <select
              value={formData.attribute_type_id}
              onChange={(e) => setFormData({
                ...formData,
                attribute_type_id: parseInt(e.target.value)
              })}
              className="input-field"
            >
              {attributes.map((attr) => (
                <option key={attr.id} value={attr.id}>
                  {attr.name[currentLanguage] || attr.name.ko}
                </option>
              ))}
            </select>
          </div>
          
          {/* 스탯 */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="label">{t('power', currentLanguage)}</label>
              <input
                type="number"
                value={formData.power}
                onChange={(e) => setFormData({
                  ...formData,
                  power: parseInt(e.target.value) || 0
                })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">{t('accuracy', currentLanguage)} (%)</label>
              <input
                type="number"
                value={formData.accuracy}
                onChange={(e) => setFormData({
                  ...formData,
                  accuracy: parseInt(e.target.value) || 100
                })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">{t('pp', currentLanguage)}</label>
              <input
                type="number"
                value={formData.pp}
                onChange={(e) => setFormData({
                  ...formData,
                  pp: parseInt(e.target.value) || 10
                })}
                className="input-field"
              />
            </div>
          </div>
          
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
          {skills.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>아직 스킬이 없습니다. 첫 스킬을 추가해보세요!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill) => {
                const attr = attributes.find(a => a.id === skill.attribute_type_id);
                return (
                  <div key={skill.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold dark:text-white">
                          {skill.name[currentLanguage] || skill.name.ko}
                        </h3>
                        {attr && (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {attr.name[currentLanguage] || attr.name.ko}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {skill.id}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      위력: {skill.power} | 명중: {skill.accuracy}% | PP: {skill.pp}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="btn bg-blue-500 text-white hover:bg-blue-600 text-sm flex-1"
                      >
                        {t('edit', currentLanguage)}
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="btn bg-red-500 text-white hover:bg-red-600 text-sm flex-1"
                      >
                        {t('delete', currentLanguage)}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillEditor;
