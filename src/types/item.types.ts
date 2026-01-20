export interface Item {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  location: string;
  expectedQuantity: number;
  unit: string;
  barcodes: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
}

export interface CreateItemInput {
  sku: string;
  name: string;
  description: string;
  category: string;
  location: string;
  expectedQuantity: number;
  unit: string;
  barcodes: string[];
  imageUrl?: string;
}

export interface UpdateItemInput {
  sku?: string;
  name?: string;
  description?: string;
  category?: string;
  location?: string;
  expectedQuantity?: number;
  unit?: string;
  barcodes?: string[];
  imageUrl?: string;
  isActive?: boolean;
}

export interface ItemSearchFilters {
  query?: string;
  category?: string;
  location?: string;
  isActive?: boolean;
}
