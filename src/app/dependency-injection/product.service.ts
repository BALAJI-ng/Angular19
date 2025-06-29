import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts() {
    let products: Product[] = [];
    products.push(new Product(1, 'Laptop', 1200));
    products.push(new Product(2, 'Smartphone', 800));
    products.push(new Product(3, 'Tablet', 600));
    products.push(new Product(4, 'Smartwatch', 300));
    return products;
  }
}
