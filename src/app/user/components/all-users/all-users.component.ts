import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'img',
    'name',
    'email',
    'phone',
    'joinOn',
    'status',
    
  ];
  dataSource = new MatTableDataSource([
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      phone: '555-555-9876',
      totalBuy: 50.0,
      status: 'inactive',
      joinOn: '2022-01-01',
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '555-555-1234',
      totalBuy: 500.25,
      status: 'active',
      joinOn: '2021-11-15',
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "555-555-1234",
      totalBuy: 500.25,
      status: "active",
      joinOn: "2021-11-15",
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      phone: '555-555-9876',
      totalBuy: 50.0,
      status: 'inactive',
      joinOn: '2022-01-01',
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '555-555-1234',
      totalBuy: 500.25,
      status: 'active',
      joinOn: '2021-11-15',
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "555-555-1234",
      totalBuy: 500.25,
      status: "active",
      joinOn: "2021-11-15",
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "555-555-1234",
      totalBuy: 500.25,
      status: "active",
      joinOn: "2021-11-15",
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      phone: '555-555-9876',
      totalBuy: 50.0,
      status: 'inactive',
      joinOn: '2022-01-01',
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '555-555-1234',
      totalBuy: 500.25,
      status: 'active',
      joinOn: '2021-11-15',
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "555-555-1234",
      totalBuy: 500.25,
      status: "active",
      joinOn: "2021-11-15",
      img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
  ]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
