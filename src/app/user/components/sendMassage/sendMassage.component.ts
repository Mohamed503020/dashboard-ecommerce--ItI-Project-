import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../Service/messages.service';

@Component({
  selector: 'app-sendMassage',
  templateUrl: './sendMassage.component.html',
  styleUrls: ['./sendMassage.component.css'],
})
export class SendMassageComponent implements OnInit {
  email = '';
  massage = '';
  constructor(private massageServ: MessagesService) {}

  ngOnInit() {}
  replayMassageUser() {
    const id = localStorage.getItem('userId');
    this.massageServ.replayMessages(id, this.email, this.massage).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.removeItem('userId');
      },
      error: (err) => {
        console.log(err.massage);
      },
    });
  }
}
