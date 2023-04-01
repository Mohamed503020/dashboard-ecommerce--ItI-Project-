import { Component } from '@angular/core';
import { MessagesService } from '../../service/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: any[] = [];

  selectedMessage: any | null = null;

  constructor(private _messageService:MessagesService) { }

  ngOnInit(): void {
    this.getMessages()
  }
  getMessages(){
    this._messageService.getAllMessages().subscribe({
      next:(res)=>{
                this.messages=res;
                console.log(this.messages)
                console.log("result done")
              },
              error:(err)=>{
                console.log(err)
                console.log("errorrrrrrrrrrrr")
              }
    })
  }
//  getProductFromWishlist(){
//     this.productInWhislis=this._wishlisService.getAllWishlist().subscribe({
//       next:(res)=>{
//         this.productInWhislis=res;
//         console.log(this.productInWhislis)
//         console.log("result done")
//       },
//       error:(err)=>{
//         console.log(err)
//         console.log("errorrrrrrrrrrrr")
//       }

//     });
//   }
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

}
