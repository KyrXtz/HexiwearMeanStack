import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Component, AfterViewInit, DoCheck, OnChanges, OnInit, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy } from '@angular/core';
import { Chart,ChartData, Point } from 'chart.js';
import 'chartjs-plugin-zoom'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  
  })
 @Injectable()
 export class DashboardComponent {
  checkhr: any;
  datenow: any;
  lasthrtime: any;
  mybool: Boolean;
  devicecheck: String;
  data: Object;
  users: Object;
  user: any;
  pname: String;
  usernamecheck: String;
  rolecheck: String;
  myChart = [];
  public chart: Chart;
  context:  any;
  canvas: any;
  value: any;
  dateUnix: any;
  public btnhandler: any;
  constructor(
    private _http: HttpClient,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
) { }

ngOnInit() {

      this.mybool = true;
      this.authService.getUsers().subscribe(profile => {
       this.users = profile.users;
      },
       err => {
        return false;
       }); 
      this.authService.getData().subscribe(profile => {
       this.data = profile.data;
      },
       err => {
        return false;
       });


      this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
   });
      localStorage.setItem('StartDate', '0');
      localStorage.setItem('EndDate', '0');
      localStorage.setItem('Patient', '0');
      localStorage.setItem('heartORsteps', '0');
}
  ngAfterViewChecked() { //this is done to ensure html loads fully
   if (this.mybool) {
   
    let heartORsteps = document.getElementById("heartORsteps") as HTMLInputElement;
    let heartORstepshandler = function() {
      var input = this.value;
      localStorage.setItem('heartORsteps', input);

    };
    if (heartORsteps){
     heartORsteps.addEventListener("change", heartORstepshandler);
    }



    let PatientName = document.getElementById("DropDown") as HTMLInputElement;
    let PatientNamehandler = function() {
      let devicename = vm.authService.HexiDeviceGet(this.value);
      var input = this.value;
      localStorage.setItem('Patient', input);
    };
    if (PatientName){
     PatientName.addEventListener("change", PatientNamehandler);
    }
    let StartDate = document.getElementById("StartDate") as HTMLInputElement;
    let EndDate = document.getElementById("EndDate") as HTMLInputElement;
    let StartDatehandler = function() {   // HANDLER GIA TA DATES
    var input = this.value;
    localStorage.setItem('StartDate', input);
    };
    let EndDatehandler = function() {   // HANDLER GIA TA DATES
    var input = this.value;
    localStorage.setItem('EndDate', input);
    };
    if (StartDate){
    StartDate.addEventListener("change", StartDatehandler);
    }
    if (EndDate) {
    EndDate.addEventListener("change", EndDatehandler);
    }


     let dataheader = document.getElementById("DataHeader");
     let chartheader = document.getElementById("ChartHeader");
     let btn = document.getElementById("coolbutton");
     var vm = this;
     if(btn){
     this.mybool = false;
     var btnhandler = function(){
               if (btn.parentNode == null) { return null;}
               if (btn) {
               var nameo = localStorage.getItem('Patient') ;

               if (nameo == '0'){
                 vm.HexiData(null);
               }else{
                 vm.HexiData(nameo);
               }               
               }
     };
     btn.addEventListener("click",btnhandler);
     }



}
} 
  HexiData(pname) {
  this.authService.getData().subscribe(profile => {
  this.data = profile.data;
  let Hexidata = this.data;
  if (pname == null){
  let HexiProfile = this.authService.HexiProfileGet();
   this.devicecheck = HexiProfile.device;
  }
  else{
   var devicechecko = localStorage.getItem('devicefordoc') ;
   this.devicecheck = devicechecko;

  }

    let hexiDates = []
    let time = []
    let Pressure = []
    let HeartRate = []
    let jsdate = []
    var startdato = localStorage.getItem('StartDate') ;
    var enddato =  localStorage.getItem('EndDate') ;
    if (startdato == '0' || enddato == '0') {
      this.flashMessage.show('Please enter Start and/or End date.', {cssClass: 'alert-danger', timeout: 3000});
      return null;
    }
    var SdateEntered = new Date(startdato).getTime();
    let SdateUnix = Math.floor(SdateEntered/1000);
    var EdateEntered = new Date(enddato).getTime();
    let EdateUnix = Math.floor(EdateEntered/1000);
    SdateUnix = SdateUnix + 10800; //GMT+3
    EdateUnix = EdateUnix + 10800;
    if (this.HexiData == null){
       this.flashMessage.show('No Data', {cssClass: 'fadeOut', timeout: 2000});
       return null;
    }
    var heartORstepso = localStorage.getItem('heartORsteps');
    if (heartORstepso == '0' ) {
      this.flashMessage.show('Please select chart to show.', {cssClass: 'alert-danger', timeout: 3000});
      return null;
    }
    
    if (heartORstepso == "HeartRate"){
    var dummycounter = 0 ;
    var fakei = 0;
    var hrcounter = 0;
      for (var i in Hexidata) {
       if (Hexidata[i].Device == this.devicecheck)
          {
          if (SdateUnix < Hexidata[i].time && EdateUnix > Hexidata[i].time){
          if (Hexidata[i].HeartRate == undefined){
            dummycounter = dummycounter +1 ;
          }
          else{
            HeartRate[hrcounter] = Hexidata[i].HeartRate;
            hrcounter = hrcounter +1;
            time[fakei-dummycounter] = Hexidata[i].time;
          }

          fakei = fakei +1 ;
          } else {
          fakei = fakei +1;
          dummycounter = dummycounter +1 ;
          }
      }
      else{
      fakei = fakei +1;
      
      }
     } 
      
       if (HeartRate.length == 0) {
           this.flashMessage.show('No data available.', {cssClass: 'alert-danger', timeout: 3000});
            return null;

        }
       this.lasthrtime = 2;
       for (var i in Hexidata){
       if (!(Hexidata[i].HeartRate == undefined) && this.user.device == Hexidata[i].Device ){
       this.lasthrtime = Hexidata[i].time;
       }
       }
       if (!(this.lasthrtime ==2)){
       this.datenow = Math.round(Date.now()/1000)+10800 ;
       this.checkhr = this.datenow - this.lasthrtime;
       if (this.checkhr > 86400) {
           this.flashMessage.show("You haven't sent HeartRate data for more than one day!", {cssClass: 'alert-danger', timeout: 8000});
            

        }
       }
       
        time.forEach((res) => { 
            jsdate[i] = new Date(res*1000);
            hexiDates.push(jsdate[i].toUTCString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })
        this.canvas = document.getElementById('canvas');
       if (this.canvas){
        if (this.chart){
        this.chart.destroy();
        }
       this.mybool = false;
       this.chart = new Chart(this.canvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: hexiDates,
            datasets: [
              {
                data: HeartRate,
                borderColor: '#3cba9f',
                label: "HeartRate",
                fill: false
              },
            ]
          },
          options: {



            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }

         }
        })
       }


  }

if (heartORstepso == 'Steps'){
   var dummycounter = 0 ;
    var fakei = 0;
    Pressure = null;
    Pressure = [];
    var pressurecounter=0;
       for (var i in Hexidata) {
        if (Hexidata[i].Device == this.devicecheck){
          if (SdateUnix < Hexidata[i].time && EdateUnix > Hexidata[i].time){

           if (Hexidata[i].Steps == undefined){
            dummycounter = dummycounter + 1;
          }
          else{
            Pressure[pressurecounter] = Hexidata[i].Steps;
            pressurecounter = pressurecounter +1;
            time[fakei-dummycounter] = Hexidata[i].time;
          }
          fakei = fakei +1 ;
          } else {
          fakei = fakei +1;
          dummycounter = dummycounter +1 ;
          }
        }else{
        fakei = fakei +1;
        }
        }
        if (Pressure.length == 0) {
           this.flashMessage.show('No data available.', {cssClass: 'alert-danger', timeout: 3000});
            return null;
 
        }
        time.forEach((res) => {
            jsdate[i] = new Date(res*1000);
            hexiDates.push(jsdate[i].toUTCString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })

        this.canvas = document.getElementById('canvas');
       if (this.canvas){
        if (this.chart){
        this.chart.destroy();
        }
       this.mybool = false;
       this.chart = new Chart(this.canvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: hexiDates,
            datasets: [
              {
                data: Pressure,
                borderColor: '#ffcc00',
                label: "Steps",
                fill: false
              },
            ]
          },
          options: {
               //new

            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }

         }
        })
       }


  


 }
       });
  
}
  

  ngOnDestroy(){
   if (this.chart){
     console.log('hibastards');
     this.chart = null;
     this.canvas.parentNode.removeChild(this.canvas);
     
  } 
  }
} 


