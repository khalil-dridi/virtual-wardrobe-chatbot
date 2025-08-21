import { Component, Input , OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-weather-recommendation-modal',
  templateUrl: './weather-recommendation-modal.component.html',
  styleUrls: ['./weather-recommendation-modal.component.css']
})
export class WeatherRecommendationModalComponent implements OnInit {
  @Input() recommendation: string;
  isVisible = false;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
   
    
  }
}
