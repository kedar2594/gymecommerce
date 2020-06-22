import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {
  HttpClient,
  HttpHeaders, HttpInterceptor
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeTwoService {

  private host = 'http://13.233.129.21:8060'
  private url: string = '';
  token: any;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    console.log(this.token)
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    }

  }

  viewproducts() {
    this.url = this.host + '/Product/ViewMultipleProducts';
    return this.http.get(this.url);
  }
  viewProdSpecification(productId) {
    this.url = this.host + '/Product/ViewProductById?productId=' + productId;
    return this.http.get(this.url);
  }

  // viewproducts() {
  //   this.url = this.host + '/Product/ViewMultipleProducts';
  //   return this.http.get(this.url);
  //   }

  viewtodayDealsOfTheDay() {
    this.url = this.host + '/DealsOfTheDay/GetTodaysDealsOfTheDay';
    return this.http.get(this.url);
  }

  viewTopProducts() {
    this.url = this.host + '/Product/ViewTopProducts';
    return this.http.get(this.url);
  }

  //Topbar menue Items

  viewTopbarMenues() {
    this.url = this.host + '/Menubar/ViewAllForPortal';
    return this.http.get(this.url);
  }

  //quick Access

  viewQuickAccess() {
    this.url = this.host + '/QuickLink/ViewMultipleQuickLink';
    return this.http.get(this.url);
  }

  viewAdvitise() {
    this.url = this.host + '/Advertisement/ViewMultipleAdvertisement';
    return this.http.get(this.url);
  }

  addToCart(data: any) {
    this.url = this.host + '/Cart/AddToCartBulk';
    return this.http.post(this.url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  addToWishlist(data: any) {
    this.url = this.host + '/WishList/AddToWishList';
    return this.http.post(this.url, data);
  }

  viewproductsbasedonsubcategoryid(subcategoryid) {
    this.url = this.host + '/Product/ViewAllProductsBasedOnSubCategoryId?subCategoryId=' + subcategoryid;
    return this.http.get(this.url);
  }

  //getProductDeatisl

  viewProductBysub(subCategoryId) {
    this.url = this.host + '/Product/ViewAllProductsBasedOnSubCategoryId?subCategoryId=' + subCategoryId;
    return this.http.get(this.url);
  }

  addAndEditOrder() {
    console.log(this.token)
    this.url = this.host + '/Order/AddAndEditOrder';
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  getOrderDetails(data: any) {
    this.url = this.host + '/Order/ViewOrderById?orderId=' + data;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //get Product Details


  vieSubCategoryDetails() {
    this.url = this.host + '/Subcategory/ViewMultipleSubcategory';
    return this.http.get(this.url);
  }

  //categoryList

  getSideCategories(data: any) {
    this.url = this.host + '/Product/ViewAllProductsBasedOnFilter';
    return this.http.post(this.url, data);
  }

  //productListfromQuicklinks

  viewProductByQuickId(quickLinkId) {
    this.url = this.host + '/Product/ViewAllProductsBasedOnQuickLinkId?quickLinkId=' + quickLinkId;
    return this.http.get(this.url);
  }

  //productlistBased on search

  viewProductFromSearch(search) {
    this.url = this.host + '/Product/ViewAllSearchResultOnSearchOverAll?searchItem=' + search;
    return this.http.get(this.url);
  }

  viewprofiledetails() {
    console.log(this.token)
    this.url = this.host + '/Customer/ViewCustomerByUserId';
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  saveAddress(data: any) {
    this.url = this.host + '/Customer/AddAndEditCustomerAddress';
    return this.http.post(this.url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  AddAndEditCustomer(data: any) {
    this.url = this.host + '/Customer/AddAndEditCustomer';
    return this.http.post(this.url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });

  }

  AddAndEditCustomercard(data: any) {
    this.url = this.host + '/Customer/AddAndEditCustomerCard';
    return this.http.post(this.url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }


  customercardetailsbyid(number) {
    console.log(this.token)
    this.url = this.host + '/Customer/ViewCustomerCardsByCustomerCardId?customerCardId=' + number;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  UpdateAddressForOrder(orderId, billingAddress, shippingAddress) {
    console.log(this.token)
    this.url = this.host + '/Order/UpdateAddressForOrder?orderId=' + orderId + '&billingAddress=' + billingAddress + '&shippingAddress=' + shippingAddress;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  applyCouponCode(orderId, couponCode) {
    this.url = this.host + '/Order/UpdateCouponForOrder?orderId=' + orderId + '&couponCode=' + couponCode;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  CalculateFinalAmount(data) {
    this.url = this.host + '/Order/CalculateFinalAmount?orderId=' + data;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //View Cart
  viewCartBasedOnCustomerAPI() {
    this.url = this.host + '​/Cart​/ViewMultipleProdctsInCartBasedOnCustomer';
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }


  //generate api key for payment gateway

  viewAPIKEY() {
    this.url = this.host + '/Payment/GetRazorKey';
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  verificationofuser(data: any) {
    this.url = this.host + '/Payment/SavePaymentStatus';
    return this.http.post(this.url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //basavaraj - 06092020
  // viewCartBasedOnCustomerAPI() {
  //   this.url = this.host + '​/Cart​/ViewMultipleProdctsInCartBasedOnCustomer';
  //   return this.http.get(this.url, {
  //     headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  //   });
  // }

  viewcartitemsafterlogin() {
    this.url = this.host + '/Cart/ViewMultipleProdctsInCartBasedOnCustomer';
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }
  viewwishlistitemsafterlogin() {
    this.url = this.host + '/WishList/ViewMultipleProdctsInWishListBasedOnCustomer';
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  removeinaddTocart(data: any) {
    this.url = this.host + '/Cart/DeleteProductFromCart?productId=' + data;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }
  removeinaddTowishlist(data: any) {
    this.url = this.host + '/WishList/DeleteProductFromWishList?productId=' + data;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  viewOrderByUserById() {
    this.url = this.host + '/Order/ViewOrdersByUserId';
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //Akshata - 061202020
  orderComplition(paymentId, orderId) {
    this.url = this.host + '/Order/OrderCompletion?paymentReferenceId=' + paymentId + '&orderId=' + orderId;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //Forgot password
  forgotPassword() {

  }

  ////otp
  requestOtp(data: any) {
    this.url = this.host + '/SMS/AddAndEditSMS?phoneNumber=' + data;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }
  validateotp(phonenumber, otpcode) {
    this.url = this.host + '/SMS/ValidateOTP?phoneNumber=' + phonenumber + '&otp=' + otpcode;
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

}
