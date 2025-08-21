import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../calendar/service.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  displayBasic:boolean=false;
  constructor(private router: Router,private eventService:ServiceService,private confirmationService:ConfirmationService) {}
  ngOnInit(): void {
    this.getEventByUser();
  }
  events: any[]=[];


  getEventByUser(){
    this.eventService.getAllEvents(JSON.parse(localStorage.getItem('userAuth')).id).subscribe(res=>{
    
      this.events=res;
      console.log(this.events);
    })
      }
      DeleteEvent(event:any){
        this.confirmationService.confirm({
          key: 'confirm1',
          message: 'Are you sure to perform this action?',
          accept: () => {
       
            this.eventService.deleteEvents(event.id).subscribe(res=>{
              console.log(res)
              this.getEventByUser();
            })
              this.displayBasic=false
          }});
      

      }
}
