export interface Category {
  id: number;
  name: string;
}

export interface Products {
  id: number;
  title: string;
  price: number;
  images: string;
  description: string;
  category: Category;
}

export interface CreateProduct extends Omit<Products, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProduct extends Partial<CreateProduct> {}
