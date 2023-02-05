import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Products = {
    id: '',
    title: '',
    images: '',
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    },
  };

  @Output() addProduct = new EventEmitter<Products>();
  @Output() showProduct = new EventEmitter<string>();


  addToShoppingCart(p: Products): void {
    this.addProduct.emit(p);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id)
  }
}
