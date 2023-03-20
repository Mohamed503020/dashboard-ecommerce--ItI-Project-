import { Component,OnInit } from '@angular/core';

interface user {
  image: URL;
  name: string;
  email: string;
  phone: string;
  joinOn: string;

}
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users :user[]=[
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "jack karry",
      email: "jackkarry@gmail.com",
      phone: "01056789461",
      joinOn: "2023-01-01"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "harry",
      email: "harrykarry@gmail.com",
      phone: "01044789461",
      joinOn: "2023-03-03"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "danyal",
      email: "danyalkarry@gmail.com",
      phone: "01044559461",
      joinOn: "2023-02-02"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "kero",
      email: "kerokarry@gmail.com",
      phone: "01044789461",
      joinOn: "2023-04-04"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "mark",
      email: "markkarry@gmail.com",
      phone: "01044789422",
      joinOn: "2023-05-05"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "vander",
      email: "vanderkarry@gmail.com",
      phone: "01033669461",
      joinOn: "2023-06-06"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "harry",
      email: "harrykarry@gmail.com",
      phone: "01044789461",
      joinOn: "2023-01-01"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "jack karry",
      email: "jackkarry@gmail.com",
      phone: "01056789461",
      joinOn: "2023-01-01"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "harry",
      email: "harrykarry@gmail.com",
      phone: "01044789461",
      joinOn: "2023-03-03"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "danyal",
      email: "danyalkarry@gmail.com",
      phone: "01044559461",
      joinOn: "2023-02-02"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "kero",
      email: "kerokarry@gmail.com",
      phone: "01044789461",
      joinOn: "2023-04-04"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "mark",
      email: "markkarry@gmail.com",
      phone: "01044789422",
      joinOn: "2023-05-05"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "vander",
      email: "vanderkarry@gmail.com",
      phone: "01033669461",
      joinOn: "2023-06-06"
    },
    {
      image:new URL ('https://cdn-icons-png.flaticon.com/512/219/219969.png'),
      name: "harry",
      email: "harrykarry@gmail.com",
      phone: "01044789461",
      joinOn: "2023-01-01"
    },
  ]

  pageSize = 6;
  startIndex = 0;
  endIndex = this.pageSize;
  currentPage = 1;
  pageNumbers: number[] = [];
  searchType = 'item';
  searchTerm = '';
  filteredItems: user[] = this.users;

  ngOnInit() {
    this.calculatePageNumbers();
  }

  calculatePageNumbers() {
    const totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.pageNumbers = Array(totalPages).fill(0).map((_, i) => i + 1);

  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.startIndex = (pageNumber - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }

  prev() {
    this.goToPage(this.currentPage - 1);
  }

  next() {
    this.goToPage(this.currentPage + 1);
  }

  setPage(page: number) {
    this.goToPage(page);
  }

  search() {
    this.filteredItems = this.users.filter(item => {
      const searchTermLower = this.searchTerm.toLowerCase();

        if (this.searchType=='name'){
          return item.name.toLowerCase().includes(searchTermLower)
        }
        if(this.searchType=='Email'){
          return item.email.toLowerCase().includes(searchTermLower)
        }
        return this.searchType === 'phone'?
        item.phone.toLowerCase().includes(searchTermLower):
        item.joinOn.toLowerCase().includes(searchTermLower);
    });
    this.currentPage = 1;
    this.calculatePageNumbers();
    this.goToPage(1);
  }
}
