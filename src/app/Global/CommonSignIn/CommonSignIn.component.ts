import { EmbryoService } from './../../Services/Embryo.service';
import { SessionService } from './../../Pages/Session/session.service';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';


@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {
  list: any;
  userName: any;
  password: any;
  durationInSeconds = 2;
  message: string = 'Fields marked with * are mandatory';
  actionButtonLabel: string = 'Login Succussfull';
  actionButtonLabel1: string;
  action: boolean = true;
  autoHide: number = 2000;
  setAutoHide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userFullName: any;
  userId: any;
  emailId: any;
  alluserdetail1: any;

  constructor(
    public homeservice: HomeTwoService,
    public embryoService: EmbryoService,
    public snackBar: MatSnackBar,
    public sessionService: SessionService) {
    this.alluserdetail1 = JSON.parse(localStorage.getItem("userDetails"));
    this.embryoService.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item"));
    if (this.embryoService.localStorageCartProducts != null) {
      this.embryoService.navbarCartCount = this.embryoService.localStorageCartProducts.length;

    } else {
      this.embryoService.navbarCartCount = 0;
    }

    console.log(this.embryoService.localStorageCartProducts);
  }

  ngOnInit() {
  }

  loginUser() {
    if (this.userName == undefined || this.userName == "" || this.userName == null
      || this.password == undefined || this.password == "" || this.password == null) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    }
    else {
      this.sessionService.loginUser(this.userName, this.password).subscribe((data: any) => {
        if (data.isStatus == true) {
          this.embryoService.navigate('home-two', []);
          let config = new MatSnackBarConfig();
          config.verticalPosition = this.verticalPosition;
          config.horizontalPosition = this.horizontalPosition;
          config.panelClass = ['custom-class1'];
          config.duration = this.setAutoHide ? this.autoHide : 0;
          this.snackBar.open('Welcome to Stayfit ' + this.userName, this.action ? this.actionButtonLabel : undefined, config);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userDetails', JSON.stringify(data.response));
          // this.embryoService.userLoginLocalStoreage(data.response);
          this.userId = data.response.userId;
          this.userName = data.response.userName;
          this.userFullName = data.response.userFullName;
          this.emailId = data.response.emailId;
          let sessionUser = {

            emailId: this.emailId,
            userId: this.userId,
            userName: this.userName,
            userFullName: this.userFullName

          }
          this.cartitems();

        } else {
          let config = new MatSnackBarConfig();
          config.verticalPosition = this.verticalPosition;
          config.horizontalPosition = this.horizontalPosition;
          config.panelClass = ['custom-class1'];
          config.duration = this.setAutoHide ? this.autoHide : 0;
          this.snackBar.open(data.response, this.action ? this.actionButtonLabel1 : undefined, config);
        }
      })
    }
  }
  cartitems() {
    this.list = [];
    this.homeservice.viewcartitemsafterlogin().subscribe((data: any) => {
      if (data.isStatus == true) {
        //  localStorage.setItem("cart_item", JSON.stringify(data.response));
        console.log('setting to local', (data.response));
        this.list = data.response;
        this.view();
        // console.log(cartProducts);
        //   console.log(JSON.parse(localStorage.getItem("cart_item1")));
        //   let p=data.response;
        // for(let i=0; i< p.length;i++){
        //     this.addToCart(p[i]);

        // }

        //  this.embryoService.localStorageCartProducts=JSON.parse(localStorage.getItem("cart_item"));
        // console.table( this.embryoService.localStorageCartProducts);
        //   this.embryoService.navbarCartCount=this.embryoService.localStorageCartProducts.length;
      } else {
        this.list = null;
        this.view();

      }
    })
    this.homeservice.viewwishlistitemsafterlogin().subscribe((data: any) => {
      if (data.isStatus == true) {
        //  localStorage.setItem("cart_item", JSON.stringify(data.response));
        console.log('setting to wishlisttttttt', (data.response));
        // this.list=data.response;
        // this.view();

      } else {
        // this.list=null;
        // this.view();

      }
    })


  }
  // addToCart(value) {
  //   this.embryoService.addToCartafterlogin(value);
  // }

  /////demo////
  view() {

    let finalApiProducts = [];
    let apilist = []
    let apifinalProducts = this.list;
    console.log(apifinalProducts);
    let loaclfinalProducts = JSON.parse(localStorage.getItem("cart_item"));
    console.log(loaclfinalProducts);

    if (loaclfinalProducts != null) {
      loaclfinalProducts.forEach(element => {
        if (element.discountPercentage > 0) {
          let obj = {
            "productId": element.productId,
            // "customerId": userData.userId,
            "quantity": parseInt(element.quantity),
            "discountPercentage": element.discountPercentage,
            "discountAmount": 0
          }
          finalApiProducts.push(obj);
        } else {
          let obj = {
            "productId": element.productId,
            // "customerId": userData.userId,
            "quantity": parseInt(element.quantity),
            "discountPercentage": 0,
            "discountAmount": 0
          }
          finalApiProducts.push(obj);
        }


      });
      console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", finalApiProducts);
      let obj = {
        // "customerId": userData.userId,
        "productDetails": finalApiProducts
      }
      console.log(obj);
    } else {
      console.log(finalApiProducts);
    }
    if (apifinalProducts != null) {
      apifinalProducts.forEach(element => {
        if (element.discountPercentage > 0) {
          let obj = {
            "productId": element.productId,
            // "customerId": userData.userId,
            "quantity": parseInt(element.quantity),
            "discountPercentage": element.discountPercentage,
            "discountAmount": 0
          }
          apilist.push(obj);
        } else {
          let obj = {
            "productId": element.productId,
            // "customerId": userData.userId,
            "quantity": parseInt(element.quantity),
            "discountPercentage": 0,
            "discountAmount": 0
          }
          apilist.push(obj);
        }


      });
      console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttt", apilist);
      let obj1 = {
        // "customerId": userData.userId,
        "productDetails": apilist
      }
      console.log(obj1);
    } else { }


    Array.prototype.push.apply(finalApiProducts, apilist);
    console.log(finalApiProducts);

    let finalobj1 = {
      // "customerId": userData.userId,
      "productDetails": finalApiProducts
    }
    this.homeservice.addToCart(finalobj1).subscribe((data: any) => {
      if (data.isStatus == true) {
        this.finalview();
      } else {
      }
    })




  }
  finalview() {
    this.homeservice.viewcartitemsafterlogin().subscribe((data: any) => {
      if (data.isStatus == true) {
        localStorage.setItem("cart_item", JSON.stringify(data.response));
        console.log('setting to local', (data.response));

        this.embryoService.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item"));
        // console.table( this.embryoService.localStorageCartProducts);
        this.embryoService.navbarCartCount = this.embryoService.localStorageCartProducts.length;
      }
    })
  }


}
