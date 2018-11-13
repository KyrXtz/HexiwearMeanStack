import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { Component, AfterViewInit, DoCheck, OnChanges, OnInit, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-caloricneeds',
  templateUrl: './caloricneeds.component.html',
  
})
export class CaloricneedsComponent {
  data: any;
  user:any;
  steps: string;
  public steps2:number;
  BMIheight:number;
  BMIweight:number;
  BMRheight:number;
  BMRweight:number;
  BMRex:number;
  BMRgen:String;
  BMRage:number;
  BMIrdy:Boolean;
  BMRrdy:Boolean;
  BMRstepsrdy:Boolean;
  public BMIcalc:number;
  public BMRcalc:number;
  public BMRtotal:number;
  public BMRsteps:number;
  constructor( private _http: HttpClient,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
    private dashService: DashboardComponent) { }

  ngOnInit() {
    var vm = this;
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
   
     this.authService.getData().subscribe(profile => {
      localStorage.setItem('steps','0');
     this.data = profile.data;
     let Hexidata = this.data;
      for (var i in Hexidata){
    if (!(Hexidata[i].Steps == undefined) && this.user.device == Hexidata[i].Device ){
       this.steps = Hexidata[i].Steps;
       localStorage.setItem('steps',this.steps);

    }
   }
     });
   });

   this.BMIheight =0;
   this.BMIweight=0;
   this.BMRheight=0;
   this.BMRweight=0;
  }

  BMR = false;   // store state
  
        toggleBMR() {
        var stepsCheck = localStorage.getItem('steps');
        var stepsgood = +stepsCheck; //string to int
        this.BMRstepsrdy = false;
        this.BMRrdy = false;
        let bool2 = this.BMR;
        this.BMR = bool2 === false ? true : false;
        if (!(stepsCheck == '0')){
           this.BMRsteps = 0.05*stepsgood ;
           this.BMRsteps = Math.round(this.BMRsteps*100)/100;
           this.BMRstepsrdy = true;
        }

}
BMI = false;
        toggleBMI() {
        this.BMIrdy = false;
        let bool = this.BMI;
        this.BMI = bool === false ? true : false;

}
onBMISubmit(){
  var heightt = this.BMIheight;
  var weightt = this.BMIweight;
  this.BMIcalc = (weightt/(heightt*heightt))*100*100 ;
  this.BMIcalc =  Math.round(this.BMIcalc*100)/100 ;
  this.BMIrdy = true;
  
}
onBMRSubmit(){
  var heightt = this.BMRheight;
  var weightt = this.BMRweight;
  var genderr = this.BMRgen;
  var age = this.BMRage;
  if (genderr == 'male')
  {
    this.BMRcalc = (10*weightt) + (6.25*heightt) - (5*age) + 5 ;
   
  }
  if (genderr == 'female')
  {
    this.BMRcalc = (10*weightt) + (6.25*heightt) - (5*age) -161 ;
  }
  else{
  }
  this.BMRtotal = this.BMRcalc*this.BMRex;
  this.BMRrdy = true;

}
}
