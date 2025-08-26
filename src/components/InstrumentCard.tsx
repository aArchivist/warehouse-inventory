import React from 'react';
import { Instrument } from '../types';

interface InstrumentCardProps {
  instrument: Instrument;
  onEdit: (instrument: Instrument) => void;
  onDelete: (instrumentId: string) => void;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({
  instrument,
  onEdit,
  onDelete
}) => {
  return (
    <div className="card" style={{ transition: 'box-shadow 0.2s ease-in-out' }}>
      <div style={{ aspectRatio: '16/9', backgroundColor: '#f3f4f6' }}>
        {instrument.photo ? (
          <img
            src={instrument.photo}
            alt={instrument.name}
            style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '12rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#f3f4f6' 
          }}>
            <svg style={{ width: '4rem', height: '4rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div style={{ padding: '1rem' }}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 600, 
          color: '#1f2937', 
          marginBottom: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {instrument.name}
        </h3>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '0.75rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: '#2563eb' 
            }}>
              {instrument.quantity}
            </span>
            <span style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280' 
            }}>
              {instrument.unit}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => onEdit(instrument)}
              style={{
                padding: '0.5rem',
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#eff6ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="Edit"
            >
              <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(instrument.id)}
              style={{
                padding: '0.5rem',
                color: '#ef4444',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="Delete"
            >
              <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {instrument.notes && (
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280', 
            backgroundColor: '#f9fafb', 
            padding: '0.5rem', 
            borderRadius: '0.375rem' 
          }}>
            <span style={{ fontWeight: 500 }}>Notes:</span> {instrument.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentCard;
