import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'ct-navbar',
  templateUrl: './navbar.component.html',
  
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    public router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
}

  
        isIn = false;   // store state
       
        toggleState() { 
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }
 

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 1500
    });
    this.router.navigate(['login']);
    return false;
  }

}

