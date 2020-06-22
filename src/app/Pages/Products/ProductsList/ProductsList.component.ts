import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EmbryoService } from '../../../Services/Embryo.service';
import * as $ from "jquery";

@Component({
  selector: 'app-ProductsList',
  templateUrl: './ProductsList.component.html',
  styleUrls: ['./ProductsList.component.scss']
})
export class ProductsListComponent implements OnInit {
  windowScrolled: boolean;
  @Output() addToCart1: EventEmitter<any> = new EventEmitter();
  type: any;
  pips: boolean = true;
  tooltips: boolean = true;
  category: any;
  pageTitle: string;
  subPageTitle: string;
  topProductslist: any;
  Productslist: any;
  public subscribers: any = {};
  simpleItems: string[] = [
    'Tradmill',
    'Cross Trainers',
    'Dumbells',
    'Recumbent Bike',
    'Upright Bike',
    'Spin Bikes',
    'Mats',
    'Benches',
    'Single Stations',
    'Multi Gyms',
    'Flooring',
    'Racks',
    'Plates',
    'Rods',
    'Weighing Scale'


  ];
  subId: any;
  subName: any;
  categorylist: any;
  selectList: any;
  productlistSub: any;
  quickId: any;
  constructor(@Inject(DOCUMENT) private document: Document, public route: ActivatedRoute,
    private router: Router,
    public embryoService: EmbryoService, private homeService: HomeTwoService
  ) {
    console.log('productlist')
    this.GetCategoryDetails();

    this.route.params.subscribe(params => {

      this.subId = params['subId'];
      this.quickId = params['quickId'];
      if (params['subId']) {
        this.subName = params['subName'];
      } else {
        this.subName = params['quickName'];
      }

      // this.route.queryParams.forEach(queryParams => {


      //   this.type = null;
      //   this.type = params['type'];
      //   this.category = queryParams['category'];

      this.getPageTitle();
      // });
      this.getProductsBySub(this.subId);
      this.getProductsFromQuicklinks(this.quickId);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // this.gettopProducts();
  }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {

      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }

    })();
  }
  window() {
    window.scrollTo(0, 0)
  }


  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.route.queryParams.forEach(queryParams => {
    //     this.category = queryParams['category'];
    //     this.type = null;
    //     this.type = params['type'];

    //     this.getPageTitle();
    //   });
    // });
    window.scrollTo(0, 0);



  }




  public getPageTitle() {
    this.pageTitle = null;
    this.subPageTitle = null;

    switch (this.type || this.category) {
      case undefined:
        this.pageTitle = "Fashion";
        this.subPageTitle = "Explore your favourite fashion style.";
        break;

      case "gadgets":
        this.pageTitle = "Gadgets";
        this.subPageTitle = "Check out our new gadgets.";
        break;

      case "accessories":
        this.pageTitle = "Accessories";
        this.subPageTitle = "Choose the wide range of best accessories.";
        break;

      default:
        this.pageTitle = "Products";
        this.subPageTitle = null;
        break;
    }
  }

  public addToCart(value) {
    this.embryoService.addToCart(value);
  }

  public addToWishList(value) {
    this.embryoService.addToWishlist(value);
  }

  //////////////////////////////////////////////

  public addToCartProduct(value: any) {
    // value.status = 1;
    this.addToCart1.emit(value);
  }
  public transformHits(hits) {
    hits.forEach(hit => {
      hit.stars = [];
      for (let i = 1; i <= 5; i) {
        hit.stars.push(i <= hit.rating);
        i += 1;
      }
    });
    return hits;
  }

  gettopProducts() {
    this.homeService.viewTopProducts().subscribe((data: any) => {
      if (data.isStatus == true) {

        this.topProductslist = data.response;
      }
    })
  }

  getProductsBySub(subId) {
    this.homeService.viewProductBysub(this.subId).subscribe((data: any) => {
      if (data.isStatus == true) {

        this.Productslist = data.response;

      } else {
        this.Productslist = "";


      }
      console.log('akshhh123checking', this.Productslist);
    })
  }

  GetCategoryDetails() {
    this.homeService.vieSubCategoryDetails().subscribe((data: any) => {
      if (data.isStatus == true) {

        this.categorylist = data.response;
      }
    })
  }

  getProductId(item, $event) {



    // $("#amountDisp").text(ui.value);
    let sliderValue1 = $('.noUi-tooltip:first').text();
    let sliderValue2 = $('.noUi-tooltip:eq(1)').text();

    var selected = [];
    $('.theClass input:checked').each(function () {
      selected.push($(this).attr('value'));
    });

    console.log('gettingSubcategoryDetails', selected.toString());

    if (selected.toString() == '') {
      this.subName = this.subName;

      let data = {
        "fromPrice": (parseInt(sliderValue1)).toString(),
        "toPrice": (parseInt(sliderValue2)).toString(),
        "subcategoryIds": this.subId
      }

      this.homeService.getSideCategories(data).subscribe((data: any) => {
        if (data.isStatus == true) {

          this.Productslist = data.response;

        } else {
          this.Productslist = "";
        }

      })
    } else {

      this.subName = "GYM EQUIPMENTS"

      let data = {
        "fromPrice": (parseInt(sliderValue1)).toString(),
        "toPrice": (parseInt(sliderValue2)).toString(),
        "subcategoryIds": selected.toString()
      }

      this.homeService.getSideCategories(data).subscribe((data: any) => {
        if (data.isStatus == true) {

          this.Productslist = data.response;
        } else {
          this.Productslist = "";
        }

      })
    }



    //   console.log('nikhilgetId2', data);






    //   $("#subId_"+ item.subcategoryId ).each(function(){
    //     selectedArray.push($(this).val());
    // });



    // selectedArray.push(item.subcategoryId);

  }


  getProductsFromQuicklinks(quickId) {
    this.homeService.viewProductByQuickId(this.quickId).subscribe((data: any) => {
      if (data.isStatus == true) {

        this.Productslist = data.response;

      } else {
        this.Productslist = "";


      }
      console.log('akshhh123checking', this.Productslist);
    })
  }

}
