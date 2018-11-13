import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})
export class HomeComponent implements OnInit {
 user: Object;


  constructor( private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
) { }

  ngOnInit() {
   this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
   });
}
}
