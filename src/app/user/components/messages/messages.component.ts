import { Component } from '@angular/core';
import { MessagesService } from '../../Service/messages.service';
import { MatDialog } from '@angular/material/dialog';
import { SendMassageComponent } from '../sendMassage/sendMassage.component';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: any[] = [];

  selectedMessage: any | null = null;

  constructor(private _messageService:MessagesService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getMessages()
  }
  getMessages() {
    const givenDate = new Date('2023-04-05T00:00:00'); // replace with your desired date
    this._messageService.getAllMessages().subscribe({
      next:(res)=>{
        this.messages=res;
        // sort messages by created_at date in descending order based on given date
        this.messages.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          const diffA = Math.abs(dateA.getTime() - givenDate.getTime());
          const diffB = Math.abs(dateB.getTime() - givenDate.getTime());
          return diffB - diffA;
        });
        console.log(this.messages);
        console.log("result done");
      },
      error:(err)=>{
        console.log(err);
        console.log("errorrrrrrrrrrrr");
      }
    })
  }
  showMessage(message: any): void {
    this.selectedMessage = message;
  }

  copyEmail(email: string): void {
    navigator.clipboard.writeText(email).then(() => {
      console.log('Email copied to clipboard!');
    }).catch(() => {
      console.log('Failed to copy email. Please try again.');
    });
  }

  openDialog(id:any) {
    localStorage.setItem('userId',id)
    const dialogRef = this.dialog.open(SendMassageComponent, {
      width:'420px', height:'380px'
    });
  

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getMessages();
    });
  }
}
