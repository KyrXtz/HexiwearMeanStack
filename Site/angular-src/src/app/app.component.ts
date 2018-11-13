import { Component, AfterViewInit, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Chart,ChartData, Point } from 'chart.js';
import {FlashMessagesService} from 'angular2-flash-messages';
import 'chartjs-plugin-zoom'
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

   })
export class AppComponent {
title = 'app';

}


