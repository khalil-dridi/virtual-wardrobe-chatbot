import { Component, OnInit } from '@angular/core';
import { Message, PrimeNGConfig, ConfirmationService } from 'primeng/api';
import { Role } from '../categorie/Role';
import { CategoryService } from '../categorie/category.service';
import { TendenceService } from './tendenceService';

@Component({
  selector: 'app-tendence-crud',
  templateUrl: './tendence-crud.component.html',
  styleUrls: ['./tendence-crud.component.css']
})
export class TendenceCrudComponent implements OnInit {

  tendences:any[]=[]
  searchTerm: string = '';
  filteredClothes:any[]=[]
  filteredTendences:any[]=[]
  clothesToUpdate:any = {};
  category:string='';
  name:string=''
  description:string='';
  file:File;
  displayModal: boolean;
  selectedCities: Role[] = [];
  cities: any[] | undefined;
  valRadio: string = '';
  countries: any[] = [];
  msgs: Message[] = [];
   pass  :string ="" ;
  displayBasic: boolean;
  displayBasic1: boolean;
  userData:any
  id:any;
  userDataJson:any
  constructor(private primengConfig: PrimeNGConfig,private tendenceService:TendenceService,private confirmationService:ConfirmationService) {}
  ngOnInit(): void {
    this.getTendences();

    this.userDataJson=  localStorage.getItem('userAuth1')
    this.userData= JSON.parse(this.userDataJson);
    this.id=this.userData.id;
    console.log( this.userData.id)
      this.primengConfig.ripple = true;
   
    const allFilterItems = document.querySelectorAll('.filter-item');
    const allFilterBtns = document.querySelectorAll('.filter-btn');

    window.addEventListener('DOMContentLoaded', () => {
      if (allFilterBtns[0] instanceof HTMLElement) {
        allFilterBtns[0].classList.add('active-btn');
      }
    });

    allFilterBtns.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        btn.addEventListener('click', () => {
          this.showFilteredContent(btn);
        });
      }
    });
  }
 

  showFilteredContent(btn: HTMLElement): void {
    const allFilterItems = document.querySelectorAll('.filter-item');

    allFilterItems.forEach((item) => {
      if (item instanceof HTMLElement && item.classList.contains(btn.id)) {
        this.resetActiveBtn();
        btn.classList.add('active-btn');
        item.style.display = 'block';
      } else {
        if (item instanceof HTMLElement) {
          item.style.display = 'none';
        }
      }
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file=file;
      
      
    }
  }
  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file=file;
      
      
    }
  }
  resetActiveBtn(): void {
    const allFilterBtns = document.querySelectorAll('.filter-btn');

    allFilterBtns.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        btn.classList.remove('active-btn');
      }
    });
  }
  showBasicDialog() {
    this.displayBasic = true;
}
showBasicDialog1() {
  this.displayBasic1 = true;
}
addTendences(){
  if(this.name&&this.description&&this.file)
    {
      let formdata:FormData=new FormData();
      let clothes ={
       name:this.name,
       description:this.description,
  
      }
      let image=this.file
     let clothesJson=JSON.stringify(clothes);
      formdata.append('tendency',clothesJson)
     formdata.append('image',image)
   
     this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.tendenceService.addTendence(formdata).subscribe(res=>{
          console.log(res)
          this.getTendences();
        } )
       
          this.displayBasic=false
      }});
      
    }
    else{
      this.msgs=[];
                  this.msgs = [{ severity: 'error', summary: 'error', detail: "please fill all  fields" }];
     }
    

}
Cancel(){
  this.displayBasic=false
  this.displayBasic1=false
}
getTendences(){
  this.tendenceService.getAllTendence().subscribe(res=>
    {
      this.tendences=res;
    this.filteredTendences=this.tendences
  
    }
  )
}
deleteTendences(id:string){
  this.confirmationService.confirm({
    key: 'confirm1',
    message: 'Are you sure to perform this action?',
    accept: () => {
      this.tendenceService.deleteTendence(id).subscribe(res=>{
        console.log(res);
        this.getTendences();
      })

    }})
}
updateTendences(clothes:any){
  this.displayBasic1 = true;
  this.clothesToUpdate=clothes;

}
confirmUpdate(){
  let formdata:FormData=new FormData();
  let clothes ={
    name:this.clothesToUpdate.name,
    description:this.clothesToUpdate.description,

  
   }
  let clothesJson=JSON.stringify(clothes);
  formdata.append('tendency',clothesJson)
  if(this.file)
    {  formdata.append('image',this.file)
this.tendenceService.updateTendence(formdata,this.clothesToUpdate.id).subscribe(res=>{
  console.log(res);
  this.displayBasic1 = false;
  this.getTendences();
  
})
    }

   else{
    this.msgs=[];
                this.msgs = [{ severity: 'error', summary: 'error', detail: "update the image" }];
   }
   
}

filterClothesByName() {
  if (this.searchTerm.trim() === '') {
    this.filteredTendences = this.tendences;
  } else {
    this.filteredTendences = this.tendences.filter(cloth => 
      cloth.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
}