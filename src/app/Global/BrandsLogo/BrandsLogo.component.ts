import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { EmbryoService } from '../../Services/Embryo.service';

@Component({
  selector: 'embryo-BrandsLogo',
  templateUrl: './BrandsLogo.component.html',
  styleUrls: ['./BrandsLogo.component.scss']
})
export class BrandslogoComponent implements OnInit, OnChanges {

   @Input() isRTL : any;

   slideConfig : any;

   brandsLogoArray : any = [
      {
         id:1,
         image:"assets/images/HGS.jpg"
      },
      {
         id:2,
         image:"assets/images/volvo.jpg"
      },
      {
         id:3,
         image:"assets/images/Toshiba.jpg"
      },
      {
         id:4,
         image:"assets/images/Samhita.jpg"
      },
      {
         id:5,
         image:"assets/images/nester.jpg"
      },
      {
         id:6,
         image:"assets/images/mcafee.jpg"
      },
      {
         id:7,
         image:"assets/images/lt.jpg"
      },
      {
         id:8,
         image:"assets/images/kvasu.jpg"
      },
      {
         id:9,
         image:"assets/images/ITC_Limited.jpg"
      },

   ]

   constructor(public embryoService : EmbryoService) { }

   ngOnInit() {
   }

   ngOnChanges() {
      this.slideConfig = {
         infinite: true,
         centerMode: true,
         slidesToShow: 5,
         slidesToScroll: 2,
         autoplay: true,
         autoplaySpeed: 1500,
         rtl: this.isRTL,
         responsive: [
            {
               breakpoint: 768,
               settings: {
                  centerMode: true,
                  slidesToShow: 4,
                  slidesToScroll: 2,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            },
            {
               breakpoint: 480,
               settings: {
                  centerMode: true,
                  slidesToShow: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            }
         ]
      };
   }

   

}
