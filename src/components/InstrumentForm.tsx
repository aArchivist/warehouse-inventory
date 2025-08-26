import React, { useState, useEffect } from 'react';
import { Instrument, Category, Subcategory } from '../types';

interface InstrumentFormProps {
  instrument?: Instrument;
  categories: Category[];
  onSave: (instrument: Omit<Instrument, 'id'>) => void;
  onCancel: () => void;
}

const InstrumentForm: React.FC<InstrumentFormProps> = ({
  instrument,
  categories,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    unit: '',
    notes: '',
    photo: '',
    categoryId: '',
    subcategoryId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (instrument) {
      setFormData({
        name: instrument.name,
        quantity: instrument.quantity,
        unit: instrument.unit,
        notes: instrument.notes,
        photo: instrument.photo || '',
        categoryId: instrument.categoryId,
        subcategoryId: instrument.subcategoryId
      });
    }
  }, [instrument]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    if (!formData.subcategoryId) {
      newErrors.subcategoryId = 'Subcategory is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
  const availableSubcategories = selectedCategory?.subcategories || [];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
            {instrument ? 'Edit Instrument' : 'Add New Instrument'}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter instrument name"
              />
              {errors.name && (
                <p className="form-error">{errors.name}</p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="0"
                  className={`form-input ${errors.quantity ? 'error' : ''}`}
                />
                {errors.quantity && (
                  <p className="form-error">{errors.quantity}</p>
                )}
              </div>
              
              <div>
                <label className="form-label">
                  Unit *
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className={`form-input ${errors.unit ? 'error' : ''}`}
                  placeholder="pieces, liters, etc."
                />
                {errors.unit && (
                  <p className="form-error">{errors.unit}</p>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">
                Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className={`form-input ${errors.categoryId ? 'error' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="form-error">{errors.categoryId}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                Subcategory *
              </label>
              <select
                name="subcategoryId"
                value={formData.subcategoryId}
                onChange={handleInputChange}
                disabled={!formData.categoryId}
                className={`form-input ${errors.subcategoryId ? 'error' : ''}`}
                style={{ 
                  backgroundColor: !formData.categoryId ? '#f3f4f6' : 'white'
                }}
              >
                <option value="">Select a subcategory</option>
                {availableSubcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
              {errors.subcategoryId && (
                <p className="form-error">{errors.subcategoryId}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="form-label">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="form-input"
                placeholder="Additional notes about the instrument..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                {instrument ? 'Update' : 'Add'} Instrument
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstrumentForm;
