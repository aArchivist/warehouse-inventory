export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  instruments: Instrument[];
}

export interface Instrument {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes: string;
  photo?: string;
  subcategoryId: string;
  categoryId: string;
}

export interface SearchFilters {
  searchTerm: string;
  categoryId: string;
  subcategoryId: string;
}

export interface DocumentItem {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string; // ISO string
  file: File; // for preview/download
}
