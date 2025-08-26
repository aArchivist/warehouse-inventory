import React from 'react';
import { Category, SearchFilters } from '../types';

interface HeaderProps {
  categories: Category[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onAddInstrument: () => void;
  onGenerateReport: () => void;
  activeSection?: 'inventory' | 'documents';
  onSectionChange?: (s: 'inventory' | 'documents') => void;
}

const Header: React.FC<HeaderProps> = ({
  categories,
  filters,
  onFiltersChange,
  onAddInstrument,
  onGenerateReport,
  activeSection = 'inventory',
  onSectionChange
}) => {
  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({ ...filters, searchTerm });
  };

  const handleCategoryChange = (categoryId: string) => {
    onFiltersChange({ 
      ...filters, 
      categoryId,
      subcategoryId: '' // Reset subcategory when category changes
    });
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    onFiltersChange({ ...filters, subcategoryId });
  };

  const selectedCategory = categories.find(cat => cat.id === filters.categoryId);
  const availableSubcategories = selectedCategory?.subcategories || [];

  return (
    <header style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
      borderBottom: '1px solid #e5e7eb' 
    }}>
      <div className="container">
        {/* Top bar: title + section toggle (left), actions (right) */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '1rem 0',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 280 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Warehouse Inventory
            </h1>
            {onSectionChange && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={`btn ${activeSection === 'inventory' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onSectionChange('inventory')}
                >
                  Inventory
                </button>
                <button
                  className={`btn ${activeSection === 'documents' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onSectionChange('documents')}
                >
                  Documents
                </button>
              </div>
            )}
          </div>

          {/* Show action buttons only for Inventory section */}
          {activeSection === 'inventory' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={onGenerateReport}
                className="btn btn-success"
              >
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Report
              </button>
              <button
                onClick={onAddInstrument}
                className="btn btn-primary"
              >
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Instrument
              </button>
            </div>
          )}
        </div>
        
        {/* Filters row (only for Inventory) */}
        {activeSection === 'inventory' && (
          <div style={{ paddingBottom: '1rem' }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              gap: '1rem'
            }}>
              {/* Search: full width */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="search" style={{ display: 'none' }}>Search instruments</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <svg style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    type="text"
                    value={filters.searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="Search instruments by name..."
                  />
                </div>
              </div>

              {/* Category */}
              <div style={{ gridColumn: 'span 6' }}>
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  id="category"
                  value={filters.categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-input"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div style={{ gridColumn: 'span 6' }}>
                <label htmlFor="subcategory" className="form-label">Subcategory</label>
                <select
                  id="subcategory"
                  value={filters.subcategoryId}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  disabled={!filters.categoryId}
                  className="form-input"
                  style={{ backgroundColor: !filters.categoryId ? '#f3f4f6' : 'white' }}
                >
                  <option value="">All Subcategories</option>
                  {availableSubcategories.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
