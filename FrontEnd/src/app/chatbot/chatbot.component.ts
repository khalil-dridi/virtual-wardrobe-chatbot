import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  showSidebar = true;

  newMessage: string = '';

  messages = [
   
  ];
  constructor(private chatpotservice: ChatbotService) {}
  sendMessage() {
    if (this.newMessage.trim()) {
    
      this.messages.push({ text: this.newMessage, sentByUser: true });
      this.chatpotservice.getReply(this.newMessage).subscribe(
        data => {
          console.log(data);
         
          this.messages.push({ text: data.message, sentByUser: false });
        },
        error => {
          console.error('There was an error!', error);
       
          this.messages.push({ text: 'Error: Unable to get response', sentByUser: false });
        }
      );
      this.newMessage = '';
    }
  }
}
