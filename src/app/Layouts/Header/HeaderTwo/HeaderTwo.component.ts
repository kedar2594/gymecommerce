import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { Router } from '@angular/router';
declare var $: any;
export interface State {
  isproduct: boolean,
  isSubCategory: boolean,
  searchItemResultName: string,
  searchItemResultId: any,
  searchImageURL: string,
  specialDiscount: any,
  specialDiscountPercentage: any
  // flag: string;
  // name: string;
  // population: string;
}
@Component({
  selector: 'HeaderTwo',
  templateUrl: './HeaderTwo.component.html',
  styleUrls: ['./HeaderTwo.component.scss']
})
export class HeaderTwoComponent implements OnInit {
  filteredStates: any;
  states: State[]
  popupResponse: any;
  details: any;
  filtername: any;
  constructor(private homeService: HomeTwoService, public embryoService: EmbryoService, public router: Router) {
    setTimeout(() => {
      this.details = JSON.parse(localStorage.getItem('userLoginDetails'));
      console.log('details 12345', this.details);
    }, 2000)


  }

  ngOnInit() {
  }

  public toggleSearch() {
    $('app-main').toggleClass('form-open');
  }

  public toggleSidebar() {
    this.embryoService.sidenavOpen = !this.embryoService.sidenavOpen;
  }

  public openConfirmationPopup(value: any) {
    let message = "Are you sure you want to delete this product?";
    this.embryoService.confirmationPopup(message).
      subscribe(res => { this.popupResponse = res },
        err => console.log(err),
        () => this.getPopupResponse(this.popupResponse, value, 'cart')
      );
  }

  public getPopupResponse(response: any, value: any, type) {
    if (response) {
      if (type == 'cart') {
        this.embryoService.removeLocalCartProduct(value);
      } else {
        this.embryoService.removeLocalWishlistProduct(value);
      }
    }
  }

  public addAllWishlistToCart(values: any) {
    this.embryoService.addAllWishListToCart(values);
  }

  public openWishlistConfirmationPopup(value: any) {
    let message = "Are you sure you want to add all products?";
    this.embryoService.confirmationPopup(message).
      subscribe(res => { this.popupResponse = res },
        err => console.log(err),
        () => this.getPopupResponse(this.popupResponse, value, 'wishlist')
      );
  }

  public selectedCurrency(value) {
    this.embryoService.currency = value;
  }

  public selectedLanguage(value) {
    this.embryoService.language = value;
  }

  public addToCart(value) {
    this.embryoService.addToCart(value, 'wishlist');
  }

  searchProduct($event) {
    console.log($event.target.value);
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.searchItemResultName.toLowerCase().indexOf(filterValue) === 0);
  }

  doFilter($event) {
    this.filtername = $event.target.value


    this.homeService.viewProductFromSearch(this.filtername).subscribe((data: any) => {
      if (data.isStatus == true) {

        this.filteredStates = data.response;

      }
      console.log('gettingsearchDetails', this.filteredStates);
    })


  }

  navigationToproductPage(state) {
    console.log('gettingDetailsfromSearch', state);

    this.router.navigate(['/products', { subId: state.searchItemResultId, subName: state.searchItemResultName }]);

  }

}
