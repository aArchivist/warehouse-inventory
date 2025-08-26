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
            photo: 'https://m.media-amazon.com/images/I/71wj1uitQpL.jpg',
            subcategoryId: '1-1',
            categoryId: '1'
          },
          {
            id: '1-1-2',
            name: 'Flat Head Screwdriver',
            quantity: 8,
            unit: 'pieces',
            notes: '3mm to 8mm blade sizes',
            photo: 'https://m.media-amazon.com/images/I/51NMmw+lGvL.jpg',
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
            photo: 'https://m.media-amazon.com/images/I/516dzL4pZlL._UF1000,1000_QL80_.jpg',
            subcategoryId: '1-2',
            categoryId: '1'
          },
          {
            id: '1-2-2',
            name: 'Socket Set',
            quantity: 5,
            unit: 'sets',
            notes: 'Metric and imperial, 1/4" to 1" drive',
            photo: 'https://m.media-amazon.com/images/I/61Wt49VTo-S.jpg',
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
            photo: 'https://m.media-amazon.com/images/I/71bmqgnZQdL._UF894,1000_QL80_.jpg',
            subcategoryId: '2-1',
            categoryId: '2'
          },
          {
            id: '2-1-2',
            name: 'Hammer Drill',
            quantity: 3,
            unit: 'pieces',
            notes: 'Heavy duty for concrete work',
            photo: 'https://m.media-amazon.com/images/I/51Lj5HaCh7L._UF894,1000_QL80_.jpg',
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
            photo: 'https://city-hire.imgix.net/assets/img/news/how-to-use-a-circular-saw.png?auto=format%2Ccompress&ch=Width%2CDPR%2CSave-Data&fit=crop&h=512&ixlib=php-3.2.0&w=512',
            subcategoryId: '2-2',
            categoryId: '2'
          },
          {
            id: '2-2-2',
            name: 'Jigsaw',
            quantity: 2,
            unit: 'pieces',
            notes: 'Variable speed, includes blades',
            photo: 'https://m.media-amazon.com/images/I/71TPm1uP3JL.jpg',
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
            photo: 'https://www.eiscolabs.com/cdn/shop/products/qzck33yh0u21gyhomxx0_fe74d6dd-3e5a-4f9c-9064-4284ef57401a_1220x700.jpg?v=1614175650',
            subcategoryId: '3-1',
            categoryId: '3'
          },
          {
            id: '3-1-2',
            name: 'Face Shield',
            quantity: 8,
            unit: 'pieces',
            notes: 'Full face protection',
            photo: 'https://proglow.de/cdn/shop/files/144_Visiere-de-protection_1.jpg?v=1749130761&width=2048',
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
            photo: 'https://www.carlroth.com/medias/NH19-1-01-1000Wx1000H?context=bWFzdGVyfGltYWdlc3wxMjM5NjV8aW1hZ2UvanBlZ3xhVzFoWjJWekwyZzNOQzlvTmpRdk9EZ3lOVFl5T0RnMU1qSTFOQzVxY0djfDU2ZGIzNDRkZGRhMjgwY2E4MWE3NTkwMmM3NDE4NmYxZjBmMDUxNjdiM2UxNTFmYWYwM2U3OGM3Yjc4ODczMjI',
            subcategoryId: '3-2',
            categoryId: '3'
          },
          {
            id: '3-2-2',
            name: 'Ear Plugs',
            quantity: 100,
            unit: 'pairs',
            notes: 'Disposable foam plugs',
            photo: 'https://cdn.modulor.de/products/lvjc/1_768_768_r_3m_gehorschutzstopsel.jpg',
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
            photo: 'https://media.wd40.de/app/uploads/2021/04/24124351/WD-40-Multifunktionsprodukt-Smart-Straw.png.webp',
            subcategoryId: '4-1',
            categoryId: '4'
          },
          {
            id: '4-1-2',
            name: 'Machine Oil',
            quantity: 5,
            unit: 'liters',
            notes: 'SAE 10W-30 grade',
            photo: 'https://www.hanseline.de/wp-content/uploads/2019/06/naehmaschinenoele.jpg',
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
            photo: 'https://www.datocms-assets.com/10845/1719527968-30035-wd-40-specialist-cleaner-degreaser-32oz_front-dr1.png?bg=transparent&fm=png&ixlib=react-8.6.4',
            subcategoryId: '4-2',
            categoryId: '4'
          },
          {
            id: '4-2-2',
            name: 'Rust Remover',
            quantity: 3,
            unit: 'liters',
            notes: 'Phosphoric acid based',
            photo: 'https://m.media-amazon.com/images/I/81MjD9jD9vL._UF1000,1000_QL80_.jpg',
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
