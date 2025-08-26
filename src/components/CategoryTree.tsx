import React, { useState } from 'react';
import { Category, Subcategory, Instrument } from '../types';

interface CategoryTreeProps {
  categories: Category[];
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  onCategorySelect: (categoryId: string) => void;
  onSubcategorySelect: (subcategoryId: string) => void;
  onInstrumentSelect: (instrumentId: string) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategorySelect,
  onSubcategorySelect,
  onInstrumentSelect
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const isExpanded = (categoryId: string) => expandedCategories.has(categoryId);

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>Categories</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {categories.map((category) => (
          <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: selectedCategoryId === category.id ? '#dbeafe' : 'transparent',
                color: selectedCategoryId === category.id ? '#1d4ed8' : '#374151'
              }}
              onClick={() => onCategorySelect(category.id)}
            >
              <span style={{ fontWeight: 500 }}>{category.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category.id);
                }}
                style={{ color: '#6b7280', cursor: 'pointer' }}
              >
                {isExpanded(category.id) ? (
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
            
            {isExpanded(category.id) && (
              <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        backgroundColor: selectedSubcategoryId === subcategory.id ? '#eff6ff' : 'transparent',
                        color: selectedSubcategoryId === subcategory.id ? '#2563eb' : '#374151'
                      }}
                      onClick={() => onSubcategorySelect(subcategory.id)}
                    >
                      <span style={{ fontSize: '0.875rem' }}>{subcategory.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        ({subcategory.instruments.length})
                      </span>
                    </div>
                    
                    <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {subcategory.instruments.map((instrument) => (
                        <div
                          key={instrument.id}
                          style={{
                            padding: '0.5rem',
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            cursor: 'pointer',
                            borderRadius: '0.375rem',
                            transition: 'background-color 0.2s ease-in-out'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => onInstrumentSelect(instrument.id)}
                        >
                          {instrument.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTree;
