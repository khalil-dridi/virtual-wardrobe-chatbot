import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { TemperatureData } from '../Models/TemperatureData';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WeatherRecommendationModalComponent } from '../weather-recommendation-modal/weather-recommendation-modal.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef
  weatherMessage: string;
  userDataJson:any;
  userData:any;
imageFile;
  defaultImage = 'https://bootdey.com/img/Content/avatar/avatar1.png';
  imageSrc: string = this.defaultImage;
  temperatureData: TemperatureData;
  modalRef: BsModalRef;
  showSidebar = true;
  constructor(private weatherService: WeatherService, private modalService: BsModalService,private userService :UserService,private router:Router,private confirmationService:ConfirmationService) {}

  ngOnInit(): void {
    this.getWeatherForUser('Tunis');
  this.userDataJson=  localStorage.getItem('userAuth')
this.userData= JSON.parse(this.userDataJson);
//console.log(this.userData)
if (this.userData.imageName) {
  this.imageSrc = `assets/images/${this.userData.imageName}`;
//  console.log(this.imageSrc)
}
  }

  getWeatherForUser(city: string): void {
    this.weatherService.getLocationDetails(city, 'en-US').subscribe({
      next: (locationDetails) => {
        const latitude = locationDetails.location.latitude[0];
        const longitude = locationDetails.location.longitude[0];
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        this.weatherService.getWeatherReport(date, latitude, longitude, 'en-US', 'm').subscribe({
          next: (weatherDetails) => {
            this.weatherService.weatherDetails = weatherDetails;
            this.weatherService.prepareData();

            this.temperatureData = this.weatherService.temperatureData;
            this.weatherMessage = this.weatherService.getClothingRecommendation(this.temperatureData.temperature);
            
            // Ouvrir le modal après 2 secondes
            setTimeout(() => {
              this.openModal();
            }, 100);
          }
        });
      }
    });
  }

  openModal(): void {
    const initialState = {
      recommendation: this.weatherMessage
    };
    this.modalRef = this.modalService.show(WeatherRecommendationModalComponent, { initialState });
  }
  updateImage(){
    this.userService.updateUserImage(this.userData.id,this.imageFile).subscribe(res=>{
      console.log(res)
      localStorage.removeItem('userAuth');
      localStorage.setItem("userAuth",JSON.stringify(res))
   window.location.reload();
    })

  }
  firstName:string="";
  lastName:string="";
  username:string="";
  email:string="";
  password:string="";

  updateProfile(){
    
    
  let  userData:any={
    id:this.userData.id,
    firstName:   this.firstName==''? this.userData.firstName : this.firstName,
    lastName: this.lastName==''?  this.userData.lastName:this.lastName,
    username:this.username==''?  this.userData.username:this.username,
    email: this.email==''? this.userData.email:this.email,
    password:this.password==''? '':this.password
    }
    console.log(userData);
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
      
        this.userService.updateUser(userData).subscribe(
          res=>{
            
            localStorage.removeItem('userAuth');
            localStorage.removeItem('accessToken');
            this.router.navigate(['/register'])
         
          }
        )
      }});
   
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageFile=file;
      
      
    }
  }
  deleteProfile(){
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.userService.deleteUser(this.userData.id).subscribe(res=>{
          console.log("delete")
          if(res==null)
            {
        
              localStorage.removeItem("userAuth");
              localStorage.removeItem("accessToken");
              this.router.navigate(['/register']);
            }  
        
        })
      
      }});
  


  
}

}
