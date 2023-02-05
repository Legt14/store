import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Products } from 'src/app/models';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category_id: string | null = null;
  limit = 10;
  offset = 0;
  productsList: Products[] = [];

  constructor(
    private route: ActivatedRoute,
    private category: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.category_id = params.get('id');
          if (this.category_id) {
            return this.category.getByCategory(
              this.category_id,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.productsList = data;
      });
  }



}
