import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Role } from './Role';
import { CategoryService } from './category.service';


interface Product {
  productName: string;
  category: string;
  price: string;
  image: string; 
}
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],

})
export class CategorieComponent implements OnInit {
  Clothes:any[]=[];
  searchTerm: string = '';
  filteredClothes:any[]=[]
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
  constructor(private primengConfig: PrimeNGConfig,private clothesService:CategoryService,private confirmationService:ConfirmationService) {}
  ngOnInit(): void {
    this.getClothes();
  this.filteredClothes=this.Clothes
    this.userDataJson=  localStorage.getItem('userAuth')
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
addClothes(){
  if(this.name&&this.category&&this.description)
    {
      let formdata:FormData=new FormData();
      let clothes ={
       name:this.name,
       description:this.description,
      category:this.category,
      id:this.userData.id
      }
      let image=this.file
     let clothesJson=JSON.stringify(clothes);
      formdata.append('clothes',clothesJson)
     formdata.append('image',image)
     console.log(formdata.get('clothes'));
     console.log(formdata.get('image'));
     this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.clothesService.addClothes(formdata).subscribe(res=>{
          console.log(res)
          this.getClothes();
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
getClothes(){
  this.clothesService.getAllClothes(JSON.parse(localStorage.getItem('userAuth')).id).subscribe(res=>
    {
      this.Clothes=res;
      console.log(this.Clothes)
      this.filteredClothes=this.Clothes
    }
  )
}
deleteClothes(id:string){
  this.confirmationService.confirm({
    key: 'confirm1',
    message: 'Are you sure to perform this action?',
    accept: () => {
      this.clothesService.deleteClothes(id).subscribe(res=>{
        console.log(res);
        this.getClothes();
      })

    }})
}
updateClothes(clothes:any){
  this.displayBasic1 = true;
  this.clothesToUpdate=clothes;

}
confirmUpdate(){
  let formdata:FormData=new FormData();
  let clothes ={
    name:this.clothesToUpdate.name,
    description:this.clothesToUpdate.description,
   category:this.clothesToUpdate.category,
  
   }
  let clothesJson=JSON.stringify(clothes);
  formdata.append('clothes',clothesJson)
  if(this.file)
    {  formdata.append('image',this.file)
this.clothesService.updateClothes(formdata,this.clothesToUpdate.id).subscribe(res=>{
  console.log(res);
  this.displayBasic1 = false;
  this.getClothes();
  
})
    }

   else{
    this.msgs=[];
                this.msgs = [{ severity: 'error', summary: 'error', detail: "update the image" }];
   }
   
}
filterClothes(category: string) {
  if (category === 'all') {
    // Afficher tous les vêtements si la catégorie est "all"
    this.filteredClothes = this.Clothes;
  } else {
    // Filtrer les vêtements par catégorie
    this.filteredClothes = this.Clothes.filter(cloth => cloth.category === category);
  }
}
filterClothesByName() {
  if (this.searchTerm.trim() === '') {
    this.filteredClothes = this.Clothes;
  } else {
    this.filteredClothes = this.Clothes.filter(cloth => 
      cloth.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
}
