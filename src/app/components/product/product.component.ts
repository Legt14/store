import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Products = {
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

  @Output() addProduct = new EventEmitter<Products>();
  @Output() showProduct = new EventEmitter<number>();


  addToShoppingCart(p: Products): void {
    this.addProduct.emit(p);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id)
  }
}
