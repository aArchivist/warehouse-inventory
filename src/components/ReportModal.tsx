import React, { useState, useEffect } from 'react';
import { Category, Instrument } from '../types';
import * as XLSX from 'xlsx';

interface ReportModalProps {
  categories: Category[];
  onClose: () => void;
}

interface SelectionState {
  categories: Set<string>;
  subcategories: Set<string>;
  instruments: Set<string>;
}

const ReportModal: React.FC<ReportModalProps> = ({
  categories,
  onClose
}) => {
  const [selection, setSelection] = useState<SelectionState>({
    categories: new Set(),
    subcategories: new Set(),
    instruments: new Set()
  });

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryId)) {
      newExpanded.delete(subcategoryId);
    } else {
      newExpanded.add(subcategoryId);
    }
    setExpandedSubcategories(newExpanded);
  };

  const handleCategorySelect = (categoryId: string, checked: boolean) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    const newSelection = { ...selection };
    
    if (checked) {
      newSelection.categories.add(categoryId);
      // Add all subcategories and instruments
      category.subcategories.forEach(subcat => {
        newSelection.subcategories.add(subcat.id);
        subcat.instruments.forEach(instrument => {
          newSelection.instruments.add(instrument.id);
        });
      });
    } else {
      newSelection.categories.delete(categoryId);
      // Remove all subcategories and instruments
      category.subcategories.forEach(subcat => {
        newSelection.subcategories.delete(subcat.id);
        subcat.instruments.forEach(instrument => {
          newSelection.instruments.delete(instrument.id);
        });
      });
    }

    setSelection(newSelection);
  };

  const handleSubcategorySelect = (subcategoryId: string, checked: boolean) => {
    const subcategory = categories
      .flatMap(cat => cat.subcategories)
      .find(subcat => subcat.id === subcategoryId);
    
    if (!subcategory) return;

    const newSelection = { ...selection };
    
    if (checked) {
      newSelection.subcategories.add(subcategoryId);
      // Add all instruments
      subcategory.instruments.forEach(instrument => {
        newSelection.instruments.add(instrument.id);
      });
    } else {
      newSelection.subcategories.delete(subcategoryId);
      // Remove all instruments
      subcategory.instruments.forEach(instrument => {
        newSelection.instruments.delete(instrument.id);
      });
    }

    setSelection(newSelection);
  };

  const handleInstrumentSelect = (instrumentId: string, checked: boolean) => {
    const newSelection = { ...selection };
    
    if (checked) {
      newSelection.instruments.add(instrumentId);
    } else {
      newSelection.instruments.delete(instrumentId);
    }

    setSelection(newSelection);
  };

  const isCategorySelected = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return false;
    
    return category.subcategories.every(subcat => 
      selection.subcategories.has(subcat.id) &&
      subcat.instruments.every(instrument => selection.instruments.has(instrument.id))
    );
  };

  const isCategoryIndeterminate = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return false;
    
    const hasSelected = category.subcategories.some(subcat => 
      selection.subcategories.has(subcat.id) ||
      subcat.instruments.some(instrument => selection.instruments.has(instrument.id))
    );
    
    const allSelected = isCategorySelected(categoryId);
    
    return hasSelected && !allSelected;
  };

  const isSubcategorySelected = (subcategoryId: string) => {
    const subcategory = categories
      .flatMap(cat => cat.subcategories)
      .find(subcat => subcat.id === subcategoryId);
    
    if (!subcategory) return false;
    
    return subcategory.instruments.every(instrument => 
      selection.instruments.has(instrument.id)
    );
  };

  const isSubcategoryIndeterminate = (subcategoryId: string) => {
    const subcategory = categories
      .flatMap(cat => cat.subcategories)
      .find(subcat => subcat.id === subcategoryId);
    
    if (!subcategory) return false;
    
    const hasSelected = subcategory.instruments.some(instrument => 
      selection.instruments.has(instrument.id)
    );
    
    const allSelected = isSubcategorySelected(subcategoryId);
    
    return hasSelected && !allSelected;
  };

  const getSelectedInstruments = (): Instrument[] => {
    return categories
      .flatMap(category => 
        category.subcategories.flatMap(subcategory => 
          subcategory.instruments.filter(instrument => 
            selection.instruments.has(instrument.id)
          )
        )
      );
  };

  const generateExcel = () => {
    const selectedInstruments = getSelectedInstruments();
    
    if (selectedInstruments.length === 0) {
      alert('Please select at least one instrument to export.');
      return;
    }

    // Prepare data for Excel
    const excelData = selectedInstruments.map(instrument => {
      const category = categories.find(cat => cat.id === instrument.categoryId);
      const subcategory = category?.subcategories.find(sub => sub.id === instrument.subcategoryId);
      
      return {
        'ID': instrument.id,
        'Category': category?.name || '',
        'Subcategory': subcategory?.name || '',
        'Instrument Name': instrument.name,
        'Quantity': instrument.quantity,
        'Unit': instrument.unit,
        'Notes': instrument.notes || ''
      };
    });

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 15 }, // ID
      { wch: 20 }, // Category
      { wch: 20 }, // Subcategory
      { wch: 30 }, // Instrument Name
      { wch: 12 }, // Quantity
      { wch: 15 }, // Unit
      { wch: 40 }  // Notes
    ];
    worksheet['!cols'] = columnWidths;

    // Style header row
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "CCCCCC" } }
        };
      }
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory Report');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `inventory_report_${timestamp}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
  };

  const selectedCount = getSelectedInstruments().length;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>
              Generate Excel Report
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
              Select categories, subcategories, or individual instruments to include in the report.
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Selected: <strong>{selectedCount}</strong> instruments
            </p>
          </div>

          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto', 
            border: '1px solid #e5e7eb', 
            borderRadius: '0.375rem',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            {categories.map((category) => (
              <div key={category.id} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={isCategorySelected(category.id)}
                    ref={(input) => {
                      if (input) {
                        input.indeterminate = isCategoryIndeterminate(category.id);
                      }
                    }}
                    onChange={(e) => handleCategorySelect(category.id, e.target.checked)}
                    style={{ margin: 0 }}
                  />
                  <button
                    onClick={() => toggleCategory(category.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      color: '#6b7280'
                    }}
                  >
                    {expandedCategories.has(category.id) ? '▼' : '▶'}
                  </button>
                  <span style={{ fontWeight: 500, color: '#1f2937' }}>
                    {category.name}
                  </span>
                </div>

                {expandedCategories.has(category.id) && (
                  <div style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} style={{ marginBottom: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            checked={isSubcategorySelected(subcategory.id)}
                            ref={(input) => {
                              if (input) {
                                input.indeterminate = isSubcategoryIndeterminate(subcategory.id);
                              }
                            }}
                            onChange={(e) => handleSubcategorySelect(subcategory.id, e.target.checked)}
                            style={{ margin: 0 }}
                          />
                          <button
                            onClick={() => toggleSubcategory(subcategory.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0.25rem',
                              color: '#6b7280'
                            }}
                          >
                            {expandedSubcategories.has(subcategory.id) ? '▼' : '▶'}
                          </button>
                          <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                            {subcategory.name}
                          </span>
                        </div>

                        {expandedSubcategories.has(subcategory.id) && (
                          <div style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                            {subcategory.instruments.map((instrument) => (
                              <div key={instrument.id} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                marginBottom: '0.125rem'
                              }}>
                                <input
                                  type="checkbox"
                                  checked={selection.instruments.has(instrument.id)}
                                  onChange={(e) => handleInstrumentSelect(instrument.id, e.target.checked)}
                                  style={{ margin: 0 }}
                                />
                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                  {instrument.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={generateExcel}
              className="btn btn-primary"
              disabled={selectedCount === 0}
              style={{
                opacity: selectedCount === 0 ? 0.5 : 1,
                cursor: selectedCount === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Download Excel ({selectedCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
