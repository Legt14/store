import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products.service.service';
import { Products } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  limit = 10;
  offset = 0;
  productsList: Products[] = [];
  constructor(
    private productService: ProductsServiceService
  ){

  }

  ngOnInit(): void {
    this.loadContent()
  }

  loadContent() {
    this.productService
      .getProductByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.productsList = data;
        this.offset += this.limit;
      }),
      (error: any) => {
        console.log(error);
      };
  }

}
