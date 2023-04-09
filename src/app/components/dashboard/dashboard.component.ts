import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllOrdersService } from 'src/app/order/components/allOrders.service';
import { MessagesService } from 'src/app/user/Service/messages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  admin = JSON.parse(localStorage.getItem('admin')!);
  constructor(
    private router: Router,
    private orderServ: AllOrdersService,
    private _messagesService: MessagesService
  ) {}

  orders: any;
  messages: any;
  messagesBody: any;
  ngOnInit(): void {
    this.orderServ.getAllOrders().subscribe({
      next: (res) => {
        if (res.length) {
          this.orders = res.length;
        } else {
          this.orders = 0;
        }
      },
      error: () => {
        this.orders = 0;
      },
    });
    this._messagesService.getAllMessages().subscribe({
      next: (res) => {
        if (res.length) {
          let unseen = res.filter((message) => message.status == 0);
          console.log(res);
          this.messagesBody = res.filter((message) => message.status == 0);
          this.messages = this.messagesBody.length;
          console.log(this.messagesBody);
        } else {
          this.messages = 0;
        }
      },
      error: () => {
        this.messages = 0;
      },
    });
  }

  logOut() {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    this.router.navigateByUrl('/auth/login');
  }
  seenFunction() {
    this._messagesService.markAllSeenMessages().subscribe({
      next: (res) => {
        console.log(res, 'all change');
        this.messages = 0;
        this.messagesBody=[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
