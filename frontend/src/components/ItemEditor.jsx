/**
 * 아이템 편집기
 */
import React, { useState } from 'react';
import axios from 'axios';
import useGameStore from '../store/gameStore';
import { t } from '../utils/translations';

function ItemEditor() {
  const {
    items,
    addItem,
    updateItem,
    deleteItem,
    currentLanguage,
  } = useGameStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: { ko: '', en: '', ja: '' },
    description: { ko: '', en: '', ja: '' },
    category: 'potion',
    usage_context: 'both',
    price: 100,
    effects: [],
  });
  
  const categories = [
    { value: 'potion', label: '포션' },
    { value: 'ball', label: '계약구' },
    { value: 'battle', label: '배틀' },
    { value: 'key', label: '키 아이템' },
  ];
  
  const usageContexts = [
    { value: 'battle', label: '배틀 중' },
    { value: 'field', label: '필드' },
    { value: 'both', label: '양쪽' },
  ];
  
  const getNextId = async () => {
    try {
      const response = await axios.get('/api/id/items');
      return response.data.next_id;
    } catch {
      return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    }
  };
  
  const handleAdd = () => {
    setIsEditing(true);
    setCurrentItem(null);
    setFormData({
      name: { ko: '', en: '', ja: '' },
      description: { ko: '', en: '', ja: '' },
      category: 'potion',
      usage_context: 'both',
      price: 100,
      effects: [],
    });
  };
  
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      usage_context: item.usage_context,
      price: item.price,
      effects: item.effects || [],
    });
  };
  
  const handleSave = async () => {
    if (!formData.name.ko.trim()) {
      alert('한국어 이름은 필수입니다.');
      return;
    }
    
    if (currentItem) {
      updateItem(currentItem.id, formData);
    } else {
      const nextId = await getNextId();
      addItem({
        id: nextId,
        ...formData,
      });
    }
    
    setIsEditing(false);
    setCurrentItem(null);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentItem(null);
  };
  
  const handleDelete = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteItem(id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">
          아이템 관리
        </h2>
        {!isEditing && (
          <button onClick={handleAdd} className="btn btn-primary">
            + {t('add', currentLanguage)}
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 dark:text-white">
            {currentItem ? '아이템 수정' : '새 아이템 추가'}
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
                placeholder="상처약"
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
                placeholder="Potion"
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
              rows="2"
              placeholder="HP를 20 회복한다."
            />
          </div>
          
          {/* 카테고리 & 사용 상황 */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="label">{t('category', currentLanguage)}</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">{t('usageContext', currentLanguage)}</label>
              <select
                value={formData.usage_context}
                onChange={(e) => setFormData({ ...formData, usage_context: e.target.value })}
                className="input-field"
              >
                {usageContexts.map((ctx) => (
                  <option key={ctx.value} value={ctx.value}>{ctx.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* 가격 */}
          <div className="mb-6">
            <label className="label">{t('price', currentLanguage)}</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({
                ...formData,
                price: parseInt(e.target.value) || 0
              })}
              className="input-field"
            />
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
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>아직 아이템이 없습니다. 첫 아이템을 추가해보세요!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold dark:text-white">
                        {item.name[currentLanguage] || item.name.ko}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {item.id}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    가격: {item.price}원
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn bg-blue-500 text-white hover:bg-blue-600 text-sm flex-1"
                    >
                      {t('edit', currentLanguage)}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

export default ItemEditor;
