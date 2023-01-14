import { Component, OnInit, Input} from '@angular/core';
import { StoreServiceService} from '../../services/store.services.service';
import { Products } from '../../models'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

/*
El componente shoppingCart debe tener:
  lista de productos agredados al cart, si el producto ya esta agregado sumarle la cantidad que se esta agregando mas el precio

*/

export class ShoppingCartComponent implements OnInit {
  @Input() viewCart = false;
  product:Products[] = [];
  total = 0;

  constructor(
    private storeService: StoreServiceService
  ){}

  ngOnInit(): void {
    this.storeService.cart$.subscribe(record =>{
      this.product = record;

      this.total = this.storeService.getTotal();
    })


  }
  removeProduct(id:any){
    let index = this.product.indexOf(id)
    this.product.splice(index, 1);
    console.log(id)
  }

}




