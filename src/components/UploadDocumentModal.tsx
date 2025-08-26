import React, { useState } from 'react';
import { DocumentItem } from '../types';

interface UploadDocumentModalProps {
  onSave: (doc: Omit<DocumentItem, 'id' | 'uploadDate'>) => void;
  onCancel: () => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ onSave, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = fileName.trim();
    const newErrors: Record<string, string> = {};
    if (!file) newErrors.file = 'Please choose a file';
    if (!trimmedName) newErrors.fileName = 'File Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // At this point file is guaranteed to be non-null
    onSave({
      file: file as File,
      fileName: trimmedName,
      fileType: (file as File).type || 'application/octet-stream',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '32rem' }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
            Upload Document
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">File *</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                className="form-input"
              />
              {errors.file && <p className="form-error">{errors.file}</p>}
            </div>

            <div>
              <label className="form-label">File Name *</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className={`form-input ${errors.fileName ? 'error' : ''}`}
                placeholder="Display name for the document"
              />
              {errors.fileName && <p className="form-error">{errors.fileName}</p>}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Upload</button>
              <button type="button" onClick={onCancel} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
