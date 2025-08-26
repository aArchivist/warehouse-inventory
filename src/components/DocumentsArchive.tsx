import React, { useState } from 'react';
import { DocumentItem } from '../types';
import UploadDocumentModal from './UploadDocumentModal';
import DocumentPreviewModal from './DocumentPreviewModal';
import ConfirmModal from './ConfirmModal';

interface DocumentsArchiveProps {
  documents: DocumentItem[];
  onAdd: (doc: DocumentItem) => void;
  onDelete: (id: string) => void;
}

const DocumentsArchive: React.FC<DocumentsArchiveProps> = ({ documents, onAdd, onDelete }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [pendingDelete, setPendingDelete] = useState<DocumentItem | null>(null);

  const handleSave = (input: Omit<DocumentItem, 'id' | 'uploadDate'>) => {
    const newDoc: DocumentItem = {
      id: Date.now().toString(),
      fileName: input.fileName,
      fileType: input.fileType,
      file: input.file,
      uploadDate: new Date().toISOString(),
    };
    onAdd(newDoc);
    setShowUpload(false);
  };

  const downloadFile = (doc: DocumentItem) => {
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const requestDelete = (doc: DocumentItem) => {
    setPendingDelete(doc);
  };

  const confirmDelete = () => {
    if (pendingDelete) {
      onDelete(pendingDelete.id);
      setPendingDelete(null);
    }
  };

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Documents Archive</h2>
        <button className="btn btn-primary" onClick={() => setShowUpload(true)}>
          Upload Document
        </button>
      </div>
      <div className="card-body">
        {documents.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No documents yet. Upload your first document.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>File Name</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Type</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Upload Date</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{doc.fileName}</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{doc.fileType || 'Unknown'}</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{new Date(doc.uploadDate).toLocaleString()}</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-secondary" onClick={() => setPreviewDoc(doc)}>Preview</button>
                        <button className="btn btn-primary" onClick={() => downloadFile(doc)}>Download</button>
                        <button className="btn btn-danger" onClick={() => requestDelete(doc)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showUpload && (
        <UploadDocumentModal
          onSave={handleSave}
          onCancel={() => setShowUpload(false)}
        />
      )}

      {previewDoc && (
        <DocumentPreviewModal document={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}

      {pendingDelete && (
        <ConfirmModal
          title="Delete Document"
          message={`Delete document "${pendingDelete.fileName}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
};

export default DocumentsArchive;
