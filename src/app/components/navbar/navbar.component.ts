import { Component, OnInit } from '@angular/core';
import { StoreServiceService } from '../../services/store.services.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  showMenu = false;
  limit = 10
  offset= 0
  showShoppingCart = false;
  productCounter = 0;
  categories: Category[] =[];

  constructor(
    private storeService: StoreServiceService,
    private category:CategoriesService
  ){}

  ngOnInit(): void {
    this.storeService.cart$.subscribe(record =>{
      this.productCounter = record.length;
    })
    this.getCategories()
  }

  toggleMenu(): void{
    this.showMenu = !this.showMenu;
  }

  toggleShoppingCart(){
   this.showShoppingCart = !this.showShoppingCart;
  console.log(this.showShoppingCart)
  }
  getCategories(){
    this.category.getAll(this.limit, this.offset).subscribe((data)=>{
      this.categories = data;
      console.log(this.categories)
    })
  }

}
