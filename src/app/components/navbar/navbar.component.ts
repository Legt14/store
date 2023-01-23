import { Component, OnInit } from '@angular/core';
import { StoreServiceService } from '../../services/store.services.service';
import { UserLoginDTO } from 'src/app/models';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  showMenu = false;

  showShoppingCart = false;

  productCounter = 0;

  constructor(
    private storeService: StoreServiceService
  ){}

  ngOnInit(): void {
    this.storeService.cart$.subscribe(record =>{
      this.productCounter = record.length;
    })
  }

  toggleMenu(): void{
    this.showMenu = !this.showMenu;
  }

  toggleShoppingCart(){
   this.showShoppingCart = !this.showShoppingCart;
  console.log(this.showShoppingCart)
  }


}
