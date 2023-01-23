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
  taxes?: number;
}

export interface CreateProduct extends Omit<Products, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProduct extends Partial<CreateProduct> {}

export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface CreateUsersDTO extends Omit<Users, 'id'> {}

export interface UserLoginDTO extends Omit<CreateUsersDTO, 'name'> {}

export interface AuthToken {
  access_token: string;
}
