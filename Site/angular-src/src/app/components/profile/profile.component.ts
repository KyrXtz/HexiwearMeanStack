import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  
})
export class ProfileComponent implements OnInit {
  user:Object;
  username: String;
  password: String;
  mybool: Boolean;
  oldpass:String;
  newpass:String;
  newpasscheck:String;
  constructor(private authService:AuthService, private router:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.mybool = true;
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.username = profile.user.username;
    },
     err => {
       return false;
     });
  }
 
 onChangeSubmit(){
  const user = {
    username: this.username,
    password: this.oldpass
    
   }
   var vm = this;
   if (!(this.newpass == this.newpasscheck)){
    this.flashMessage.show("New passwords don't match.", {cssClass: 'alert-danger',timeout: 5000});
    return null;
   }
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        const user2 ={
          username: vm.username,
          password: vm.newpass
        }
       vm.authService.ChangeUserPass(user2).subscribe(data => {

        });

        this.flashMessage.show('Password changed.', {
          cssClass: 'alert-success',
          timeout: 1500, closeOnClick:true});
      } else {
        this.flashMessage.show('Wrong old password.', {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
    }
}


 

