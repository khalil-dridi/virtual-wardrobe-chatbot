import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  test=0;
  constructor(private router:Router){}
    userDataJson :any;
    userData:any;
    userData1:any;
    
    defaultImage = 'https://bootdey.com/img/Content/avatar/avatar1.png';
    imageSrc:string=this.defaultImage;
    ngOnInit(): void {
        this.userDataJson=  localStorage.getItem('userAuth')
        this.userData= JSON.parse(this.userDataJson)
        if (this.userData && this.userData.imageName) {
            this.imageSrc = `assets/images/${this.userData.imageName}`;
          //  console.log(this.imageSrc)
          }
          if(this.userDataJson==undefined)
            { this.test=1;
              console.log(this.test);
              this.userDataJson=  localStorage.getItem('userAuth1')
              this.userData1= JSON.parse(this.userDataJson)
              
            }
    }
    isWardrobeOpen = false;

    toggleWardrobe() {
        this.isWardrobeOpen = !this.isWardrobeOpen;
    }
    logOut(){
      if(localStorage.getItem("accessToken")!=undefined){
        localStorage.removeItem("userAuth");
        localStorage.removeItem("accessToken") 
        this.router.navigate(['/register'])
      }
      else{
        localStorage.removeItem("userAuth1");
        localStorage.removeItem("accessToken1")
        this.router.navigate(['/login'])

      }
        
       
       
       
    }

}
