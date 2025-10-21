/**
 * 몬무 편집기
 */
import React, { useState } from 'react';
import axios from 'axios';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

function MonmusEditor() {
  const {
    monmusList,
    attributes,
    addMonmus,
    updateMonmus,
    deleteMonmus,
    currentLanguage,
  } = useGameStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentMonmus, setCurrentMonmus] = useState(null);
  const [formData, setFormData] = useState({
    name: { ko: '', en: '', ja: '' },
    description: { ko: '', en: '', ja: '' },
    pokedex_number: 1,
    attribute_types: [],
    base_stats: {
      hp: 100,
      attack: 50,
      defense: 50,
      sp_attack: 50,
      sp_defense: 50,
      speed: 50,
    },
    height: 1.0,
    weight: 10.0,
    exp_yield: 100,
    catch_rate: 45,
    learnable_skills: [],
    evolution_conditions: [],
    abilities: [],
    image_url: null,
  });
  
  const getNextId = async () => {
    try {
      const response = await axios.get('/api/id/monmus');
      return response.data.next_id;
    } catch {
      return monmusList.length > 0 ? Math.max(...monmusList.map(m => m.id)) + 1 : 1;
    }
  };
  
  const handleAdd = () => {
    setIsEditing(true);
    setCurrentMonmus(null);
    setFormData({
      name: { ko: '', en: '', ja: '' },
      description: { ko: '', en: '', ja: '' },
      pokedex_number: monmusList.length + 1,
      attribute_types: attributes.length > 0 ? [attributes[0].id] : [],
      base_stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        sp_attack: 50,
        sp_defense: 50,
        speed: 50,
      },
      height: 1.0,
      weight: 10.0,
      exp_yield: 100,
      catch_rate: 45,
      learnable_skills: [],
      evolution_conditions: [],
      abilities: [],
      image_url: null,
    });
  };
  
  const handleEdit = (monmus) => {
    setIsEditing(true);
    setCurrentMonmus(monmus);
    setFormData({
      name: monmus.name,
      description: monmus.description,
      pokedex_number: monmus.pokedex_number,
      attribute_types: monmus.attribute_types,
      base_stats: monmus.base_stats,
      height: monmus.height,
      weight: monmus.weight,
      exp_yield: monmus.exp_yield,
      catch_rate: monmus.catch_rate,
      learnable_skills: monmus.learnable_skills || [],
      evolution_conditions: monmus.evolution_conditions || [],
      abilities: monmus.abilities || [],
      image_url: monmus.image_url,
    });
  };
  
  const handleSave = async () => {
    if (!formData.name.ko.trim()) {
      alert('한국어 이름은 필수입니다.');
      return;
    }
    
    if (currentMonmus) {
      updateMonmus(currentMonmus.id, formData);
    } else {
      const nextId = await getNextId();
      addMonmus({
        id: nextId,
        ...formData,
      });
    }
    
    setIsEditing(false);
    setCurrentMonmus(null);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentMonmus(null);
  };
  
  const handleDelete = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMonmus(id);
    }
  };
  
  const toggleAttributeType = (attrId) => {
    const types = formData.attribute_types;
    if (types.includes(attrId)) {
      setFormData({
        ...formData,
        attribute_types: types.filter(id => id !== attrId)
      });
    } else if (types.length < 2) {
      setFormData({
        ...formData,
        attribute_types: [...types, attrId]
      });
    } else {
      alert('최대 2개의 속성만 선택할 수 있습니다.');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">
          몬무 관리
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
        <div className="card">
          <h3 className="text-xl font-bold mb-4 dark:text-white">
            {currentMonmus ? '몬무 수정' : '새 몬무 추가'}
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
                placeholder="파이리"
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
                placeholder="Charmander"
              />
            </div>
          </div>
          
          {/* 설명 */}
          <div className="mb-6">
            <label className="label">설명 ({t('korean', currentLanguage)})</label>
            <textarea
              value={formData.description.ko}
              onChange={(e) => setFormData({
                ...formData,
                description: { ...formData.description, ko: e.target.value }
              })}
              className="input-field"
              rows="3"
              placeholder="꼬리의 불꽃이 타오르는 불 속성 몬무."
            />
          </div>
          
          {/* 도감 번호 */}
          <div className="mb-6">
            <label className="label">{t('pokedexNumber', currentLanguage)}</label>
            <input
              type="number"
              value={formData.pokedex_number}
              onChange={(e) => setFormData({
                ...formData,
                pokedex_number: parseInt(e.target.value) || 1
              })}
              className="input-field"
            />
          </div>
          
          {/* 속성 타입 */}
          <div className="mb-6">
            <label className="label">속성 타입 (최대 2개)</label>
            <div className="flex flex-wrap gap-2">
              {attributes.map((attr) => (
                <button
                  key={attr.id}
                  onClick={() => toggleAttributeType(attr.id)}
                  className={`px-4 py-2 rounded-lg ${
                    formData.attribute_types.includes(attr.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {attr.name[currentLanguage] || attr.name.ko}
                </button>
              ))}
            </div>
          </div>
          
          {/* 기본 스탯 */}
          <div className="mb-6">
            <label className="label">{t('baseStats', currentLanguage)}</label>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">HP</label>
                <input
                  type="number"
                  value={formData.base_stats.hp}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_stats: { ...formData.base_stats, hp: parseInt(e.target.value) || 0 }
                  })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">공격</label>
                <input
                  type="number"
                  value={formData.base_stats.attack}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_stats: { ...formData.base_stats, attack: parseInt(e.target.value) || 0 }
                  })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">방어</label>
                <input
                  type="number"
                  value={formData.base_stats.defense}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_stats: { ...formData.base_stats, defense: parseInt(e.target.value) || 0 }
                  })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">특수공격</label>
                <input
                  type="number"
                  value={formData.base_stats.sp_attack}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_stats: { ...formData.base_stats, sp_attack: parseInt(e.target.value) || 0 }
                  })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">특수방어</label>
                <input
                  type="number"
                  value={formData.base_stats.sp_defense}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_stats: { ...formData.base_stats, sp_defense: parseInt(e.target.value) || 0 }
                  })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">스피드</label>
                <input
                  type="number"
                  value={formData.base_stats.speed}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_stats: { ...formData.base_stats, speed: parseInt(e.target.value) || 0 }
                  })}
                  className="input-field"
                />
              </div>
            </div>
          </div>
          
          {/* 기타 정보 */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="label">키 (m)</label>
              <input
                type="number"
                step="0.1"
                value={formData.height}
                onChange={(e) => setFormData({
                  ...formData,
                  height: parseFloat(e.target.value) || 0
                })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">몸무게 (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({
                  ...formData,
                  weight: parseFloat(e.target.value) || 0
                })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">경험치</label>
              <input
                type="number"
                value={formData.exp_yield}
                onChange={(e) => setFormData({
                  ...formData,
                  exp_yield: parseInt(e.target.value) || 0
                })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">계약 확률</label>
              <input
                type="number"
                value={formData.catch_rate}
                onChange={(e) => setFormData({
                  ...formData,
                  catch_rate: parseInt(e.target.value) || 0
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
        <div>
          {monmusList.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>아직 몬무가 없습니다. 첫 몬무를 추가해보세요!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monmusList.map((monmus) => (
                <div key={monmus.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold dark:text-white">
                        {monmus.name[currentLanguage] || monmus.name.ko}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        No. {monmus.pokedex_number}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {monmus.id}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {monmus.attribute_types.map((typeId) => {
                      const attr = attributes.find(a => a.id === typeId);
                      return attr ? (
                        <span
                          key={typeId}
                          className="px-2 py-1 bg-primary text-white text-xs rounded"
                        >
                          {attr.name[currentLanguage] || attr.name.ko}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    HP: {monmus.base_stats.hp} | 공격: {monmus.base_stats.attack} | 방어: {monmus.base_stats.defense}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(monmus)}
                      className="btn bg-blue-500 text-white hover:bg-blue-600 text-sm flex-1"
                    >
                      {t('edit', currentLanguage)}
                    </button>
                    <button
                      onClick={() => handleDelete(monmus.id)}
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

export default MonmusEditor;
