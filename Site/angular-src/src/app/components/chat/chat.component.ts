import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import * as style from './chat.component.css';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
 
})
export class ChatComponent implements OnInit {
user: any;
users: any;
docs: any;
username: String;
Recipient: String;
Message: String;
mybool: Boolean;
  constructor(private authService:AuthService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
       this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
   });
      this.authService.getUsers().subscribe(profile => {
       this.users = profile.users;
      },
       err => {
        return false;
       });

  localStorage.setItem('Doc', '0');
  this.mybool = true;
  this.authService.getDocs().subscribe(profile => {
       this.docs = profile.users;
      },
       err => {
        return false;
       });
  }
 ngAfterViewChecked() { //this is done to ensure html loads fully
   if (this.mybool) {


   var vm = this;
   let DocName = document.getElementById("Recipient") as HTMLInputElement;
    let DocNamehandler = function() {
       vm.authService.getProfile().subscribe(profile => {
       this.user = profile.user;

     vm.authService.getMessage(this.user.name).subscribe( res => {
     var DocRecipient = localStorage.getItem('Doc') ;
     var element = function(id){
                return document.getElementById(id);
            }
      var myNode = document.getElementById("messagebox");
     while (myNode.firstChild) {
     myNode.removeChild(myNode.firstChild);
     }

     var messagebox = element('messagebox');
     var x = res.message.length -1;
     for ( x ; x>=0;x--){
      if (!((DocRecipient == res.message[x].Recipient && this.user.name ==  res.message[x].Sender) || (this.user.name ==  res.message[x].Recipient  && DocRecipient ==  res.message[x].Sender))){
      }else{
      var message = document.createElement('div');
      var time = document.createElement('i');
      var t = res.message[x].Time;
      var date = new Date(t);
      var rtime = date.toLocaleString();
      time.textContent = rtime ;
      if(this.user.name == res.message[x].Recipient){
      message.setAttribute('class', "alert alert-dismissible alert-info");
      message.textContent = res.message[x].Sender+": "+res.message[x].Message;
      }else{
      message.setAttribute('class', 'alert alert-dismissible alert-warning');
      message.textContent = res.message[x].Sender+": "+res.message[x].Message;
      }
      messagebox.appendChild(message);
      message.appendChild(time);
      messagebox.insertBefore(message, messagebox.firstChild);
      messagebox.insertBefore(time, messagebox.firstChild);
     }
     }
      return true;
     });
      });

      var input = this.value;
      localStorage.setItem('Doc', input);
    };
    if (DocName){
     this.mybool = false;
     DocName.addEventListener("change", DocNamehandler);
    }




 }
 }
 onMessageSend(){
 this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;

 var time = Date.now();
 var DocRecipient = localStorage.getItem('Doc') ;
 if (DocRecipient == '0'){
  this.flashMessage.show('Select Recipient', {cssClass: 'alert-warning', timeout: 2000});
       return null;
  
 }
 const message = {
  Sender: this.user.name,
  Recipient: DocRecipient,
  Message: this.Message,
  Time: time
  }
   this.authService.sendMessage(message).subscribe( res => {
      var messagebox = document.getElementById('messagebox');
      var message2 = document.createElement('div');
      var time = document.createElement('i');
      var t = message.Time;
      var date = new Date(t);
      var rtime = date.toLocaleString();
      time.textContent = rtime ;
      message2.setAttribute('class', 'alert alert-dismissible alert-warning');
      message2.textContent = message.Sender+": "+message.Message;
      messagebox.appendChild(message2);
      message2.appendChild(time);
      messagebox.insertBefore(message2, messagebox.lastChild);
      messagebox.insertBefore(time, messagebox.lastChild);
      var textarea = document.getElementById('Message') as HTMLInputElement; 
      textarea.value = null;

      return true;
     });

 });
 }
 onRefresh(){
   this.authService.getProfile().subscribe(profile => {
       this.user = profile.user;

     this.authService.getMessage(this.user.name).subscribe( res => {
     var DocRecipient = localStorage.getItem('Doc') ;
     if (DocRecipient == '0'){
     this.flashMessage.show('Select Recipient', {cssClass: 'alert-warning', timeout: 2000});
       return null;

     }
     var element = function(id){
                return document.getElementById(id);
            }
     var myNode = document.getElementById("messagebox");
     while (myNode.firstChild) {
     myNode.removeChild(myNode.firstChild);
     }

     var messagebox = element('messagebox');
     var x = res.message.length -1;
     for ( x ; x>=0;x--){
      if (!((DocRecipient == res.message[x].Recipient && this.user.name ==  res.message[x].Sender) || (this.user.name ==  res.message[x].Recipient  && DocRecipient ==  res.message[x].Sender))){
      }else{
      var message = document.createElement('div');
      var time = document.createElement('i');
      var t = res.message[x].Time;
      var date = new Date(t);
      var rtime = date.toLocaleString();
      time.textContent = rtime ;
      if(this.user.name == res.message[x].Recipient){
      message.setAttribute('class', "alert alert-dismissible alert-info");
      message.textContent = res.message[x].Sender+": "+res.message[x].Message;
      }else{
      message.setAttribute('class', 'alert alert-dismissible alert-warning');
      message.textContent = res.message[x].Sender+": "+res.message[x].Message;
      }
      messagebox.appendChild(message);
      message.appendChild(time);
      messagebox.insertBefore(message, messagebox.firstChild);
      messagebox.insertBefore(time, messagebox.firstChild);
     }
     }
      return true;
     });
      });

 }
}
