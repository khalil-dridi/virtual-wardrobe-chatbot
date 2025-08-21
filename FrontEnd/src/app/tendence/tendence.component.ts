import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Product } from './domain/product';
import { ProductService } from './service/product.service';
import { TendenceService } from './tendenceService';
@Component({
  selector: 'app-tendence',
  templateUrl: './tendence.component.html',
  styleUrls: ['./tendence.component.css']
})
export class TendenceComponent   implements OnInit {
  products: Product[] | undefined;
  tendences:any;
 degree=5;
 text:string=""
  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService,private tendenceService:TendenceService) {}

  ngOnInit() {
    
    this.text=this.getClothingSuggestion(this.degree);
    this.getAllTendence();
      this.productService.getProductsSmall().then((products) => {
          this.products = products;
      });

      this.responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
     
   
  }
  getAllTendence(){
    this.tendenceService.getAllTendence().subscribe(res=>{
        this.tendences=res;
    })
  }
  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
            default :
            return 'INSTOCK'
    }
}
visible: boolean = false;

showDialog() {
    
    this.visible = true;
}
getClothingSuggestion(temperature: number): string {
    if (temperature < 0) {
      return 'Portez une doudoune, un bonnet, une écharpe, des gants et des bottes.';
    } else if (temperature >= 0 && temperature < 10) {
      return 'Portez un manteau chaud, un pull, un pantalon épais et des chaussures fermées.';
    } else if (temperature >= 10 && temperature < 20) {
      return 'Portez une veste légère, un pull ou un sweat-shirt, un pantalon et des chaussures fermées.';
    } else if (temperature >= 20 && temperature < 30) {
      return 'Portez un t-shirt, un short ou une jupe et des sandales ou des chaussures légères.';
    } else {
      return 'Portez des vêtements très légers, comme un débardeur et un short, et des sandales. N\'oubliez pas de vous protéger du soleil!';
    }
  }
  
}