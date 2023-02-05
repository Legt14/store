import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Products } from 'src/app/models';
import { ProductsServiceService } from 'src/app/services/products.service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product_id: string | null = null;
  product: Products | null= null

  constructor(
    private products: ProductsServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.product_id = params.get('id');
          if (this.product_id) {
            return this.products.getProduct(this.product_id);
          }
          return [];
        })
      )
      .subscribe((data) => {
        // this.productList.push(data)
        this.product = data;
      });
  }
  goToBack() {
    this.location.back();
  }
}
