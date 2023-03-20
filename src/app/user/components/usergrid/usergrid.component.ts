import { Component } from '@angular/core';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})

export class UsergridComponent {
  data=[
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "img": "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      "address": "123 Main St, Anytown USA"
    },
    {
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "img": "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      "address": "456 Elm St, Anycity USA"
    },
    {
      "name": "Bob Johnson",
      "email": "bobjohnson@example.com",
      "img": "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      "address": "789 Oak St, Anyville USA"
    },
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "img": "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      "address": "123 Main St, Anytown USA"
    },
    {
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "img": "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      "address": "456 Elm St, Anycity USA"
    },
    {
      "name": "Bob Johnson",
      "email": "bobjohnson@example.com",
      "img": "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      "address": "789 Oak St, Anyville USA"
    }
  ]
}
