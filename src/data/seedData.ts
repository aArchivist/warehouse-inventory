import { Category } from '../types';

export const seedData: Category[] = [
  {
    id: '1',
    name: 'Hand Tools',
    subcategories: [
      {
        id: '1-1',
        name: 'Screwdrivers',
        categoryId: '1',
        instruments: [
          {
            id: '1-1-1',
            name: 'Phillips Head Screwdriver Set',
            quantity: 15,
            unit: 'pieces',
            notes: 'Various sizes from #0 to #3',
            subcategoryId: '1-1',
            categoryId: '1'
          },
          {
            id: '1-1-2',
            name: 'Flat Head Screwdriver',
            quantity: 8,
            unit: 'pieces',
            notes: '3mm to 8mm blade sizes',
            subcategoryId: '1-1',
            categoryId: '1'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Wrenches',
        categoryId: '1',
        instruments: [
          {
            id: '1-2-1',
            name: 'Adjustable Wrench',
            quantity: 12,
            unit: 'pieces',
            notes: '8-inch to 24-inch sizes',
            subcategoryId: '1-2',
            categoryId: '1'
          },
          {
            id: '1-2-2',
            name: 'Socket Set',
            quantity: 5,
            unit: 'sets',
            notes: 'Metric and imperial, 1/4" to 1" drive',
            subcategoryId: '1-2',
            categoryId: '1'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Power Tools',
    subcategories: [
      {
        id: '2-1',
        name: 'Drills',
        categoryId: '2',
        instruments: [
          {
            id: '2-1-1',
            name: 'Cordless Drill',
            quantity: 6,
            unit: 'pieces',
            notes: '18V, includes 2 batteries each',
            subcategoryId: '2-1',
            categoryId: '2'
          },
          {
            id: '2-1-2',
            name: 'Hammer Drill',
            quantity: 3,
            unit: 'pieces',
            notes: 'Heavy duty for concrete work',
            subcategoryId: '2-1',
            categoryId: '2'
          }
        ]
      },
      {
        id: '2-2',
        name: 'Saws',
        categoryId: '2',
        instruments: [
          {
            id: '2-2-1',
            name: 'Circular Saw',
            quantity: 4,
            unit: 'pieces',
            notes: '7-1/4 inch blade, corded',
            subcategoryId: '2-2',
            categoryId: '2'
          },
          {
            id: '2-2-2',
            name: 'Jigsaw',
            quantity: 2,
            unit: 'pieces',
            notes: 'Variable speed, includes blades',
            subcategoryId: '2-2',
            categoryId: '2'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Safety Equipment',
    subcategories: [
      {
        id: '3-1',
        name: 'Eye Protection',
        categoryId: '3',
        instruments: [
          {
            id: '3-1-1',
            name: 'Safety Glasses',
            quantity: 25,
            unit: 'pairs',
            notes: 'Clear and tinted options',
            subcategoryId: '3-1',
            categoryId: '3'
          },
          {
            id: '3-1-2',
            name: 'Face Shield',
            quantity: 8,
            unit: 'pieces',
            notes: 'Full face protection',
            subcategoryId: '3-1',
            categoryId: '3'
          }
        ]
      },
      {
        id: '3-2',
        name: 'Hearing Protection',
        categoryId: '3',
        instruments: [
          {
            id: '3-2-1',
            name: 'Ear Muffs',
            quantity: 15,
            unit: 'pairs',
            notes: 'Noise reduction rating 25dB',
            subcategoryId: '3-2',
            categoryId: '3'
          },
          {
            id: '3-2-2',
            name: 'Ear Plugs',
            quantity: 100,
            unit: 'pairs',
            notes: 'Disposable foam plugs',
            subcategoryId: '3-2',
            categoryId: '3'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Chemicals & Lubricants',
    subcategories: [
      {
        id: '4-1',
        name: 'Lubricants',
        categoryId: '4',
        instruments: [
          {
            id: '4-1-1',
            name: 'WD-40',
            quantity: 12,
            unit: 'cans',
            notes: '400ml aerosol cans',
            subcategoryId: '4-1',
            categoryId: '4'
          },
          {
            id: '4-1-2',
            name: 'Machine Oil',
            quantity: 5,
            unit: 'liters',
            notes: 'SAE 10W-30 grade',
            subcategoryId: '4-1',
            categoryId: '4'
          }
        ]
      },
      {
        id: '4-2',
        name: 'Cleaning Supplies',
        categoryId: '4',
        instruments: [
          {
            id: '4-2-1',
            name: 'Degreaser',
            quantity: 8,
            unit: 'liters',
            notes: 'Heavy duty industrial cleaner',
            subcategoryId: '4-2',
            categoryId: '4'
          },
          {
            id: '4-2-2',
            name: 'Rust Remover',
            quantity: 3,
            unit: 'liters',
            notes: 'Phosphoric acid based',
            subcategoryId: '4-2',
            categoryId: '4'
          }
        ]
      }
    ]
  }
];

// Mock documents are created in memory (App) because we need real File objects at runtime.
export interface MockDocSeed {
  fileName: string;
  fileType: string;
  contentBase64: string; // small embedded sample
}

export const mockDocumentSeeds: MockDocSeed[] = [
  {
    fileName: 'Sample.pdf',
    fileType: 'application/pdf',
    contentBase64: 'JVBERi0xLjQKJcKlwrHDqwoKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nL1BhZ2VzIDIgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8L1R5cGUgL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZSAvUGFnZS9NZWRpYUJveFswIDAgMzAwIDQwMF0vUGFyZW50IDIgMCBSL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8L0xlbmd0aCA1NCA+PgpzdHJlYW0KQlQKIC9GMSAyNCBUZgogMTAwIDEwMCBUZAooU2FtcGxlIFBERiBkb2N1bWVudCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTQgMDAwMDAgbiAKMDAwMDAwMDA3MCAwMDAwMCBuIAowMDAwMDAwMTkzIDAwMDAwIG4gCjAwMDAwMDAzMDUgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDUvUm9vdCAxIDAgUgovSW5mbyA1IDAgUgo+PgpzdGFydHhyZWYKMzI4CiUlRU9G' // tiny PDF
  },
  {
    fileName: 'Image.png',
    fileType: 'image/png',
    contentBase64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAF0lEQVQoU2NkYGD4z0ABYBw1QFQAABycAKKqP8YQAAAAAElFTkSuQmCC' // tiny png
  }
];
