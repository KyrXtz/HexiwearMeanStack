import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  role: String;
  device: String;
  user: Object;
  users: Object;
  mybool: Boolean;
  rolebool: Boolean;
  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   this.mybool = true;
   this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
   });

   this.authService.getUsers().subscribe(profile => {
       this.users = profile.users;
      },
       err => {
        return false;
       });
  localStorage.setItem('Patient', '0');
  localStorage.setItem('role', '0');

  }
  ngAfterViewChecked() { //this is done to ensure html loads fully
   if (this.mybool) {
    
    let PatientName = document.getElementById("DropDown") as HTMLInputElement;
    let Role = document.getElementById("role") as HTMLInputElement;
    let Rolehandler = function() {
      var input = this.value;
      localStorage.setItem('role', input);
    };
 
    let PatientNamehandler = function() {
      var input = this.value;
      localStorage.setItem('Patient', input);
    };
    if (Role){
     Role.addEventListener("change", Rolehandler);
    }

    if (PatientName){
     this.mybool = false;
     PatientName.addEventListener("change", PatientNamehandler);
    }
  }
  var rolecheck = localStorage.getItem('role') 
  if ((rolecheck == 'Doctor')  || (rolecheck == '0') ){
    if ( document.getElementById("divdevice")){ 
    document.getElementById("divdevice").style.visibility='hidden';
    }
    if ( document.getElementById("divsubmit")){
    document.getElementById("divsubmit").style.visibility='visible';
    }
  }
  if ((rolecheck == 'Patient')) {
   if ( document.getElementById("divdevice")){
   document.getElementById("divdevice").style.visibility='visible';
   }
   if ( document.getElementById("divsubmit")){
   document.getElementById("divsubmit").style.visibility='hidden';
   }
  }
 }
  onDeleteSubmit(){
    var patientDelete = localStorage.getItem('Patient') ;
    if (patientDelete == '0') {
      this.flashMessage.show('Please select Patient.', {cssClass: 'alert-danger', timeout: 3000});
      return null;
    }
  
    this.authService.DeleteUser(patientDelete).subscribe(data => {

      if(data.success){
        this.flashMessage.show('Patient Deleted', {cssClass: 'alert-success', timeout: 3000});
       this.ngOnInit();
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);

      }
    });

  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role,
      device: this.device
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('User Registered', {cssClass: 'alert-success', timeout: 3000});
        this.ngOnInit();
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);

      }
    });
  
  }

}

