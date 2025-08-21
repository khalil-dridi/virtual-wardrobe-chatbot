import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebare',
    templateUrl: './sidebare.component.html',
    styleUrls: ['./sidebare.component.css']
})
export class SidebareComponent implements OnInit {
    constructor(private router:Router){}
    userDataJson :any;
    userData:any;
    defaultImage = 'https://bootdey.com/img/Content/avatar/avatar1.png';
    imageSrc:string=this.defaultImage;
    ngOnInit(): void {
        this.userDataJson=  localStorage.getItem('userAuth')
        this.userData= JSON.parse(this.userDataJson)
        if (this.userData.imageName) {
            this.imageSrc = `assets/images/${this.userData.imageName}`;
          //  console.log(this.imageSrc)
          }
    }
    isWardrobeOpen = false;

    toggleWardrobe() {
        this.isWardrobeOpen = !this.isWardrobeOpen;
    }
    logOut(){
        localStorage.removeItem("userAuth");
        localStorage.removeItem("accessToken")
        this.router.navigate(['/register'])
    }
}
