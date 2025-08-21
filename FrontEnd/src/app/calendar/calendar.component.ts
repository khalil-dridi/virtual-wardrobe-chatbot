import { Component, OnInit } from '@angular/core';
import { faArrowCircleLeft, faArrowCircleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ServiceService } from './service.service';

declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  faArrowCircleLeft: any = faArrowCircleLeft;
  faArrowCircleRight: any = faArrowCircleRight;
  faUser: any = faUser;
  showSidebar = true;
  currentDate: string = "";
  days: { day: number, currentMonth: boolean }[] = [];
  currYear!: number;
  currMonth!: number;
  selectedDay!: any;
  months: string[] = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin ", "Juillet",
    "Août", "Septembre", "Octobre", "Novembre", "Decembre"];

  events: { date: number, title: string, color: string, month: number, year: number }[] = [];
  
  firstDayofMonth: number;
  lastDateofMonth: number;
  constructor(private router: Router,private eventService:ServiceService) {}

  ngOnInit() {
    this.getEventByUser();
    this.goToToday();
  }

  goToToday() {
    let date = new Date();
    this.currYear = date.getFullYear();
    this.currMonth = date.getMonth();
    this.renderCalendar();
  }

  renderCalendar() {
    this.days = [];
    this.firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    this.lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(this.currYear, this.currMonth, this.lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();

    for (let i = this.firstDayofMonth; i > 0; i--) {
      this.days.push({ day: lastDateofLastMonth - i + 1, currentMonth: false });
    }

    for (let i = 1; i <= this.lastDateofMonth; i++) {
      this.days.push({ day: i, currentMonth: true });
    }

    for (let i = lastDayofMonth; this.days.length % 7 !== 0; i++) {
      this.days.push({ day: i - lastDayofMonth + 1, currentMonth: false });
    }

    this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
  }

  prevNextClick(isPrev: boolean) {
    this.currMonth = isPrev ? this.currMonth - 1 : this.currMonth + 1;

    if (this.currMonth < 0 || this.currMonth > 11) {
      let date = new Date(this.currYear, this.currMonth, new Date().getDate());
      this.currYear = date.getFullYear();
      this.currMonth = date.getMonth();
    } else {
      this.currYear = new Date().getFullYear();
    }
    this.renderCalendar();
  }

  handleDayClick(day: any) {
    this.selectedDay = day;
    $('#formModal').modal('show');
    console.log('Clicked on day:', day);
  }
  createEvent(eventTitle: string, eventColor: string) {
    console.log('Event Title:', eventTitle);
    console.log('Event Color:', eventColor);
    
    // Récupérer la date actuelle
    const currentDate = new Date();
    
    // Si le mois en cours ne correspond pas au mois de la date sélectionnée, ajuster la date
    if (this.currMonth !== currentDate.getMonth()) {
        this.currMonth = currentDate.getMonth();
        this.currYear = currentDate.getFullYear();
        this.renderCalendar();
    }
   
     let event={
      date: this.selectedDay.day, title:eventTitle, color: eventColor, month: this.currMonth, year: this.currYear

     }
     console.log(event);
     this.eventService.addEvent(event,JSON.parse(localStorage.getItem('userAuth')).id).subscribe(res=>{
      console.log(res);
      
     })
    // Ajouter l'événement
    this.events.push({ date: this.selectedDay.day, title: eventTitle, color: eventColor, month: this.currMonth, year: this.currYear });
    
    $('#formModal').modal('hide');
   
    this.renderCalendar(); 
    
}

  hasEvent(day: any): boolean {
    return this.events.some(event => 
      event.date === day && 
      event.month === this.currMonth && 
      event.year === this.currYear &&
      day.currentMonth==true
    );
  }
  
  getEvents(day: any) {
    const uniqueEvents = [];
    const addedDates = new Set<number>();
  
    for (const event of this.events) {
      if (event.date === day.day && event.month === this.currMonth && event.year === this.currYear && day.currentMonth==true) {
        uniqueEvents.push(event);
        addedDates.add(event.date);
      }
    }
  
    return uniqueEvents;
  }
  
  

  
  
  isCurrentDate(day: any): boolean {
    const currentDate = new Date();
    const calendarDate = new Date(this.currYear, this.currMonth, day.day);
    return currentDate.getDate() === calendarDate.getDate() &&
           currentDate.getMonth() === calendarDate.getMonth() &&
           currentDate.getFullYear() === calendarDate.getFullYear()&&
           day.currentMonth==true
          
  }
  
  deleteEvent() {
    // Implémentez la logique de suppression d'un événement
  }
  
  getEventByUser() {
    this.eventService.getAllEvents(JSON.parse(localStorage.getItem('userAuth')).id).subscribe(res => {
      this.events = res;
      console.log(this.events);
    });
  }
}
