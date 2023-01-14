import { Component, OnInit } from '@angular/core';
import { CreateProduct, Products, UpdateProduct } from '../../models';
import { StoreServiceService } from '../../services/store.services.service';
import { ProductsServiceService } from '../../services/products.service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  shoppingCart: Products[] = [];
  total = 0;

  productsList: Products[] = [];

  productToggle = false;

  productChosen: Products = {
    id: 0,
    title: '',
    images: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
    },
  };

  toggleProductDatail() {
    this.productToggle = !this.productToggle;
  }

  constructor(
    private storeService: StoreServiceService,
    private productService: ProductsServiceService
  ) {
    this.shoppingCart = storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.productsList = data;
    });
  }

  onAddToShoppingCart(product: Products): void {
    this.storeService.addToShoppingCart(product);
    this.total = this.storeService.getTotal();
  }

  onShowtDetail(id: number) {
    this.productService.getProduct(id).subscribe((data) => {
      this.productChosen = data;
      this.toggleProductDatail();
    });
  }

  createProduct(): void {
    const newProduct: CreateProduct = {
      title: 'My product',
      price: 1000,
      description: 'My Description',
      categoryId: 3,
      images: 'https://placeimg.com/640/480/',
    };
    this.productService.create(newProduct).subscribe((data) => {
      console.log(data);
      this.productsList.unshift(data);
    });
  }

  updateProduct() {
    const change: UpdateProduct = {
      title: 'Pencil',
    };

    const id = this.productChosen.id;
    this.productService.update(change, id).subscribe((data) => {
      let prod = this.productsList.findIndex(item => item.id === id)
      this.productsList[prod] = data
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productService.delete(id).subscribe(()=>{
      let prodIndex = this.productsList.findIndex(item => item.id === id);
      this.productsList.splice(prodIndex, 1);
      this.productToggle = false;
    });
  };
};
