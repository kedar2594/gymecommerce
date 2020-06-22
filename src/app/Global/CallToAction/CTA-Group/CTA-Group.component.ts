import { HomeTwoService } from './../../../Pages/Home/home-two.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'embryo-CtaGroup',
  templateUrl: './CTA-Group.component.html',
  styleUrls: ['./CTA-Group.component.scss']
})
export class CTAGroupComponent implements OnInit {
  quickAccesslist: any;
  subId: any;
  products: any = [

    {

      name: 'Tradmill',
      background: "green-dark",
      color: "#dc306f",

    },
    {
      name: 'Cross Trainers',
      background: "blue-dark",
    },
    {
      name: 'Dumbells',
      background: "yellow",
    },
    {
      name: 'Dumbells',
      background: "orange",
    },
    {
      name: 'Dumbells',
      background: "pink",
    },
    {
      name: 'Dumbells',
      background: "red",
    },
    {
      name: 'Dumbells',
      background: "purple",
    },
    {
      name: 'Dumbells',
      background: "blue",
    },
    {
      name: 'Dumbells',
      background: "green",
    },
    {
      name: 'Dumbells',
      background: "blue",
    }



  ]
  callToActionArray: any = [
    {
      img_path: "assets/images/sf_accessories_icon (1).jpg",
      route: "/products/gadgets/11"
    },
    {
      img_path: "assets/images/sf_accessories_icon (2).jpg",
      route: "/products/men/3"
    },
    {
      img_path: "assets/images/sf_accessories_icon (3).jpg",
      route: "/products/gadgets/10"
    },
    {
      img_path: "assets/images/sf_accessories_icon (4).jpg",
      route: "/products/men/5"
    },
    {
      img_path: "assets/images/sf_accessories_icon (5).jpg",
      route: "/products/gadgets/12"
    },
    {
      img_path: "assets/images/sf_accessories_icon (6).jpg",
      route: "/products/men/3"
    },
    {
      img_path: "assets/images/sf_accessories_icon (7).jpg",
      route: "/products/men/3"
    },
    {
      img_path: "assets/images/sf_accessories_icon (8).jpg",
      route: "/products/men/3"
    }

  ]

  constructor(private homeService: HomeTwoService, private router: Router) {
    this.getQuickAccess();
  }

  ngOnInit() { }

  getQuickAccess() {
    this.homeService.viewQuickAccess().subscribe((data: any) => {
      if (data.isStatus == true) {

        this.quickAccesslist = data.response;
      }
    })
  }


  navigateToProducts(data) {
    console.log('getDataDetails', data);

    console.log('checkingForIdinProducts', this.subId);
    this.router.navigate(['/products', { quickId: data.quickLinkId, quickName: data.quickLinkName }]);

  }

}
