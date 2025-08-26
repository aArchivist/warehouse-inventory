import React, { useState, useMemo, useEffect } from 'react';
import { Category, Instrument, SearchFilters, DocumentItem } from './types';
import { seedData, mockDocumentSeeds } from './data/seedData';
import Header from './components/Header';
import CategoryTree from './components/CategoryTree';
import InstrumentCard from './components/InstrumentCard';
import InstrumentForm from './components/InstrumentForm';
import ReportModal from './components/ReportModal';
import DocumentsArchive from './components/DocumentsArchive';
import ConfirmModal from './components/ConfirmModal';
import './App.css';

function App() {
  const [categories, setCategories] = useState<Category[]>(seedData);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    categoryId: '',
    subcategoryId: ''
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [editingInstrument, setEditingInstrument] = useState<Instrument | undefined>();
  const [pendingDeleteInstrument, setPendingDeleteInstrument] = useState<Instrument | null>(null);
  const [activeSection, setActiveSection] = useState<'inventory' | 'documents'>('inventory');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  // Seed mock documents using base64 -> File
  useEffect(() => {
    if (documents.length > 0) return; // seed once
    const seeded: DocumentItem[] = mockDocumentSeeds.map((seed, idx) => {
      const byteString = atob(seed.contentBase64);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: seed.fileType });
      const file = new File([blob], seed.fileName, { type: seed.fileType });
      return {
        id: `seed-${idx}`,
        fileName: seed.fileName,
        fileType: seed.fileType,
        file,
        uploadDate: new Date().toISOString(),
      };
    });
    setDocuments(seeded);
  }, []);

  // Get all instruments from all categories
  const allInstruments = useMemo(() => {
    return categories.flatMap(category =>
      category.subcategories.flatMap(subcategory =>
        subcategory.instruments
      )
    );
  }, [categories]);

  // Filter instruments based on search and filters
  const filteredInstruments = useMemo(() => {
    return allInstruments.filter(instrument => {
      const matchesSearch = !filters.searchTerm || 
        instrument.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        instrument.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesCategory = !filters.categoryId || 
        instrument.categoryId === filters.categoryId;
      
      const matchesSubcategory = !filters.subcategoryId || 
        instrument.subcategoryId === filters.subcategoryId;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [allInstruments, filters]);

  const handleAddInstrument = () => {
    setEditingInstrument(undefined);
    setShowForm(true);
  };

  const handleEditInstrument = (instrument: Instrument) => {
    setEditingInstrument(instrument);
    setShowForm(true);
  };

  const requestDeleteInstrument = (instrument: Instrument) => {
    setPendingDeleteInstrument(instrument);
  };

  const confirmDeleteInstrument = () => {
    if (!pendingDeleteInstrument) return;
    const id = pendingDeleteInstrument.id;
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        subcategories: category.subcategories.map(subcategory => ({
          ...subcategory,
          instruments: subcategory.instruments.filter(instrument => instrument.id !== id)
        }))
      }))
    );
    setPendingDeleteInstrument(null);
  };

  const handleSaveInstrument = (instrumentData: Omit<Instrument, 'id'>) => {
    if (editingInstrument) {
      const updatedInstrument: Instrument = {
        ...editingInstrument,
        ...instrumentData
      };
      
      setCategories(prevCategories =>
        prevCategories.map(category => ({
          ...category,
          subcategories: category.subcategories.map(subcategory => ({
            ...subcategory,
            instruments: subcategory.instruments.map(instrument =>
              instrument.id === editingInstrument.id ? updatedInstrument : instrument
            )
          }))
        }))
      );
    } else {
      const newInstrument: Instrument = {
        ...instrumentData,
        id: Date.now().toString()
      };
      
      setCategories(prevCategories =>
        prevCategories.map(category => ({
          ...category,
          subcategories: category.subcategories.map(subcategory => ({
            ...subcategory,
            instruments: subcategory.id === instrumentData.subcategoryId
              ? [...subcategory.instruments, newInstrument]
              : subcategory.instruments
          }))
        }))
      );
    }
    
    setShowForm(false);
    setEditingInstrument(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingInstrument(undefined);
  };

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const addDocument = (doc: DocumentItem) => {
    setDocuments(prev => [doc, ...prev]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header
        categories={categories}
        filters={filters}
        onFiltersChange={setFilters}
        onAddInstrument={handleAddInstrument}
        onGenerateReport={handleGenerateReport}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        {activeSection === 'documents' ? (
          <DocumentsArchive
            documents={documents}
            onAdd={addDocument}
            onDelete={deleteDocument}
          />
        ) : (
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111827' }}>
                  Instruments ({filteredInstruments.length})
                </h2>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Showing {filteredInstruments.length} of {allInstruments.length} instruments
                </div>
              </div>
            </div>
            
            <div className="card-body">
              {filteredInstruments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <svg style={{ margin: '0 auto', height: '3rem', width: '3rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>No instruments found</h3>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    Try adjusting your search or filter criteria.
                  </p>
                  <div style={{ marginTop: '1.5rem' }}>
                    <button
                      onClick={handleAddInstrument}
                      className="btn btn-primary"
                    >
                      <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Instrument
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  {filteredInstruments.map(instrument => (
                    <InstrumentCard
                      key={instrument.id}
                      instrument={instrument}
                      onEdit={handleEditInstrument}
                      onDelete={() => requestDeleteInstrument(instrument)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {showForm && (
        <InstrumentForm
          instrument={editingInstrument}
          categories={categories}
          onSave={handleSaveInstrument}
          onCancel={handleCancelForm}
        />
      )}

      {showReportModal && activeSection === 'inventory' && (
        <ReportModal
          categories={categories}
          onClose={handleCloseReportModal}
        />
      )}

      {pendingDeleteInstrument && (
        <ConfirmModal
          title="Delete Instrument"
          message={`Delete instrument "${pendingDeleteInstrument.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeleteInstrument}
          onCancel={() => setPendingDeleteInstrument(null)}
        />
      )}
    </div>
  );
}

export default App;
