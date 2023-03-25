import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-products',
  templateUrl: './grid-products.component.html',
  styleUrls: ['./grid-products.component.css']
})
export class GridProductsComponent {
 products = [
    {
      name: 'Product 1',
      img: 'https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/16/915293/1.jpg?0677',
      price: 9.99,
      rate: 4.5,
    },
    {
      name: 'Product 2',
      img: 'https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/419751/1.jpg?6878',
      price: 19.99,
      rate: 3.8,
    },
    {
      name: 'Product 3',
      img: 'https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/667812/1.jpg?9689',
      price: 14.99,
      rate: 4.2,
    },
    {
      name: 'Product 4',
      img: 'https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/52/336673/1.jpg?1033',
      price: 29.99,
      rate: 4.8,
    },
    {
      name: 'Product 5',
      img: 'https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/35/565193/1.jpg?8186',
      price: 39.99,
      rate: 4.0,
    },
    {
      name: 'Product 1',
      img: 'https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/16/915293/1.jpg?0677',
      price: 9.99,
      rate: 4.5,
    },
    {
      name: 'Product 2',
      img: 'https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/419751/1.jpg?6878',
      price: 19.99,
      rate: 3.8,
    },
    {
      name: 'Product 3',
      img: 'https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/667812/1.jpg?9689',
      price: 14.99,
      rate: 4.2,
    },
    {
      name: 'Product 4',
      img: 'https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/52/336673/1.jpg?1033',
      price: 29.99,
      rate: 4.8,
    },
  ];

}
