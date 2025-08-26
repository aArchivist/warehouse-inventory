import React from 'react';
import { DocumentItem } from '../types';

interface DocumentPreviewModalProps {
  document: DocumentItem;
  onClose: () => void;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ document, onClose }) => {
  const objectUrl = URL.createObjectURL(document.file);
  const type = document.fileType.toLowerCase();
  const isImage = type.includes('png') || type.includes('jpg') || type.includes('jpeg');
  const isPdf = type.includes('pdf');

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '80vw', width: '80vw' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{document.fileName}</h3>
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
        <div style={{ padding: '1rem' }}>
          {isPdf ? (
            <iframe title={document.fileName} src={objectUrl} style={{ width: '100%', height: '70vh', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
          ) : isImage ? (
            <img src={objectUrl} alt={document.fileName} style={{ maxWidth: '100%', maxHeight: '70vh', display: 'block', margin: '0 auto' }} />
          ) : (
            <div className="card" style={{ padding: '1rem' }}>
              <p style={{ color: '#6b7280' }}>Preview not available. Please download the file.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
