import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, NgForm } from '@angular/forms';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { DatePipe } from '@angular/common';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.scss']
})
export class EditProfileComponent implements OnInit {

  customerCardId: any;
  selected: any;
  userfirstName: any;
  lastName: any;
  firstName: any;
  fullName: any;
  email: any;
  password: any;
  phoneNumber: any;
  confirmPassword: any;
  userdetails: any;
  birthdate: any;
  birthage: any;


  // userfirstName: any;
  // lastName: any;
  // firstName: any;
  // fullName: any;
  // email: any;
  // password: any;
  // phoneNumber: any;
  // confirmPassword: any;
  // userdetails: any;
  // birthdate: any;
  // birthage: any;
  addAddress: any;
  addBulidingName: any;
  addStreetNo: any;
  addState: any;
  addPinCode: any;
  addCountry: any;
  showaddShippingAddress: boolean = false;
  showAddAddressBtn: boolean = false;
  // userdetails:any;
  type: string;
  info: FormGroup;
  address: FormGroup;
  card: FormGroup;
  addShippinngAddress: FormGroup;
  addBillingAddress: FormGroup;
  emailPattern: any = /\S+@\S+\.\S+/;
  toastOption: ToastOptions = {
    title: "Account Information",
    msg: "Your account information updated successfully!",
    showClose: true,
    timeout: 3000,
    theme: "material"
  };
  toastOption1: ToastOptions = {
    title: "Account Information",
    msg: "Phone number and email-id are mandatory!",
    showClose: true,
    timeout: 3000,
    theme: "material"
  };
  durationInSeconds = 2;
  message: string = 'Fields marked with * are mandatory';
  actionButtonLabel: string = '';
  actionButtonLabel1: string;
  action: boolean = true;
  autoHide: number = 2000;
  setAutoHide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formGroup: FormBuilder,
    public snackBar: MatSnackBar,
    private toastyService: ToastaService, private datePipe: DatePipe, private homeService: HomeTwoService) {
    this.viewprofile();

    // this.route.params.subscribe(params => {
    //   this.route.queryParams.forEach(queryParams => {
    //     this.type = queryParams['type'];
    //   });
    // });

    this.route.params.subscribe(params => {

      this.route.queryParams.forEach(queryParams => {
        this.type = queryParams['type'];
        let number = queryParams['number'];
        console.log(number);
        if (number) {
          this.viewcustomercarddetails(number);
          console.log("true");

        } else {
          this.customerCardId = 0;
          console.log("falseeeeee");
        }
      });
    });

    // this.userdetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  ngOnInit() {
    this.info = this.formGroup.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['male'],
      date: [],
      phone_number: ['', [Validators.required]],
      age: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });

    this.address = this.formGroup.group({
      address: ['', [Validators.required]],
      buiding_name: ['', [Validators.required]],
      street_no: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      country: ['', [Validators.required]],
      checkAddress: ['', [Validators.required]]
    });

    this.addShippinngAddress = this.formGroup.group({
      shipaddress: ['', [Validators.required]],
      shipbuiding_name: ['', [Validators.required]],
      shipstreet_no: ['', [Validators.required]],
      shipcity: ['', [Validators.required]],
      shipstate: ['', [Validators.required]],
      shipzip_code: ['', [Validators.required]],
      shipcountry: ['', [Validators.required]],
    })

    this.addBillingAddress = this.formGroup.group({
      billaddress: ['', [Validators.required]],
      billbuiding_name: ['', [Validators.required]],
      billstreet_no: ['', [Validators.required]],
      billcity: ['', [Validators.required]],
      billstate: ['', [Validators.required]],
      billzip_code: ['', [Validators.required]],
      billcountry: ['', [Validators.required]],
      billcheckAddress: ['', [Validators.required]]
    })

    this.card = this.formGroup.group({
      card_name: ['', [Validators.required]],
      card_type: ['', [Validators.required]],
      card_bankname: ['', [Validators.required]],
      card_number: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      name: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]]
    })
  }
  viewprofile() {
    this.homeService.viewprofiledetails().subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log('profiledetailssssss', data.response);
        this.userdetails = data.response;
        console.log(this.userdetails);

        let primaryAddress = this.userdetails.primaryAddress.split(',');
        let shippingAddress = this.userdetails.shippingAddress.split(',');

        //   this.info.first_name=this.userdetails.customerFullName;
        setTimeout(() => {
          this.info = this.formGroup.group({
            gender: [this.userdetails.sex],
            first_name: [this.userdetails.customerFirstName],
            last_name: [this.userdetails.customerLastName],
            date: [],
            phone_number: [this.userdetails.phoneNumber],
            age: [this.userdetails.age],
            email: [this.userdetails.emailId]
          })

          this.address = this.formGroup.group({
            address: primaryAddress[0],
            buiding_name: primaryAddress[1],
            street_no: primaryAddress[2],
            city: primaryAddress[3],
            state: primaryAddress[4],
            zip_code: primaryAddress[5],
            country: primaryAddress[6],
            checkAddress: ""
          });

          this.address = this.formGroup.group({
            address: shippingAddress[0],
            buiding_name: shippingAddress[1],
            street_no: shippingAddress[2],
            city: shippingAddress[3],
            state: shippingAddress[4],
            zip_code: shippingAddress[5],
            country: shippingAddress[6],
            checkAddress: ""
          });

        }, 3000);

      } else {
      }
    })
  }


  /**
   * Function is used to submit the profile info.
   * If form value is valid, redirect to profile page.
   */
  submitProfileInfo() {
    console.log(this.info.value);
    // if(this.info.valid){
    //    this.router.navigate(['/account/profile']).then(()=>{
    //      this.toastyService.success(this.toastOption);
    //    });
    // } else {
    //    for (let i in this.info.controls) {
    //       this.info.controls[i].markAsTouched();
    //    }
    // }
    if (this.info.value.phone_number == null || this.info.value.phone_number == undefined || this.info.value.phone_number.length < 10
      || this.info.value.email == null || this.info.value.email == undefined) {
      this.toastyService.success(this.toastOption1);
    } else {
      let obj = {
        "customerId": this.userdetails.customerId,
        "userId": this.userdetails.userId,
        "customerFirstName": this.info.value.first_name,
        "customerLastName": this.info.value.last_name,
        "customerFullName": this.info.value.first_name + " " + this.info.value.last_name,
        "sex": this.info.value.gender,
        "age": this.info.value.age,
        "bodyType": null,
        "emailId": this.info.value.email,
        "phoneNumber": this.info.value.phone_number,
        "profilePic": null
      }

      console.log(obj);
      this.homeService.AddAndEditCustomer(obj).subscribe((data: any) => {
        if (data.isStatus == true) {
          this.toastyService.success(this.toastOption);

          this.router.navigate(['/account/profile']);
        }
      })
    }

  }

  OnDateChange(data) {
    this.birthdate = this.datePipe.transform(data, 'yyyy-MM-dd');
    console.log(this.birthdate);
    this.birthdate = this.birthdate;
    var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
    this.birthage = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    console.log(this.birthage);
    this.userdetails.age = this.birthage;
  }
  /**
   * Function is used to submit the profile address.
   * If form value is valid, redirect to address page.
   */
  submitAddress() {
    if (this.address.valid) {
      this.router.navigate(['/account/address']).then(() => {
        this.toastyService.success(this.toastOption);
      });
    } else {
      for (let i in this.address.controls) {
        this.address.controls[i].markAsTouched();
      }
    }
  }

  /**
   * Function is used to submit the profile card.
   * If form value is valid, redirect to card page.
   */
  // submitCard() {
  //   if (this.card.valid) {
  //     this.router.navigate(['/account/card']).then(() => {
  //       this.toastyService.success(this.toastOption);
  //     });
  //   } else {
  //     for (let i in this.card.controls) {
  //       this.card.controls[i].markAsTouched();
  //     }
  //   }
  // }

  submitCard() {
    if (this.card.valid) {
      // this.router.navigate(['/account/card']).then(()=>{
      //   this.toastyService.success(this.toastOption);
      // });

      let obj = {
        "customerCardId": this.customerCardId,
        "cardName": this.card.value.card_name.toUpperCase(),
        "cardHolderName": this.card.value.name.toUpperCase(),
        "cardType": this.card.value.card_type.toUpperCase(),
        "cardBank": this.card.value.card_bankname.toUpperCase(),
        "cardNumber": this.card.value.card_number,
        "cardCvv": this.card.value.cvv,
        "cardExpiryMonth": parseInt(this.card.value.month),
        "cardExpiryYear": parseInt(this.card.value.year)
      }
      console.log(obj);
      this.homeService.AddAndEditCustomercard(obj).subscribe((data: any) => {
        if (data.isStatus == true) {
          this.toastyService.success(this.toastOption);

          this.router.navigate(['/account/profile']);

        }
      })

    } else {
      for (let i in this.card.controls) {
        this.card.controls[i].markAsTouched();
      }

    }

  }

  viewcustomercarddetails(number) {
    this.homeService.customercardetailsbyid(number).subscribe((data: any) => {
      if (data.isStatus == true) {
        this.customerCardId = data.response[0].customerCardId;
        console.log(" individual  carddetailsssssss", data.response);
        let details = data.response[0];
        setTimeout(() => {
          this.card = this.formGroup.group({
            card_name: [details.cardName],
            card_type: [details.cardType],
            card_bankname: [details.cardBank],
            card_number: [details.cardNumber],
            cvv: [details.cardCvv],
            name: [details.cardHolderName],
            month: [details.cardExpiryMonth.toString()],
            year: [details.cardExpiryYear.toString()],
          })


        }, 200);


      }
    })
  }

  getRadio($event) {
    console.log($event.value);
    if ($event.value == 'No') {
      this.showaddShippingAddress = true;
      this.showAddAddressBtn = false;
    } else {
      this.showaddShippingAddress = false;
      this.showAddAddressBtn = true;
    }

  }

  saveAddAddress() {

    if (this.addBillingAddress.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('All fields are mandtory in billing information', this.action ? this.actionButtonLabel : undefined, config);
    } else {
      let saveAddAddress = this.addBillingAddress.value.billaddress + ',' + this.addBillingAddress.value.billbuiding_name + ',' + this.addBillingAddress.value.billstreet_no + ',' + this.addBillingAddress.value.billcity + ',' + this.addBillingAddress.value.billstate + ',' + this.addBillingAddress.value.billzip_code + ',' + this.addBillingAddress.value.billcountry
      console.log(saveAddAddress, this.addBillingAddress.value.billcheckAddress);
      if (this.addBillingAddress.value.billcheckAddress == 'Yes') {
        let obj = {
          "primaryAddress": saveAddAddress,
          "secondaryAddress": "",
          "shippingAddress": saveAddAddress
        }
        console.log('sameadd', obj);
        this.homeService.saveAddress(obj).subscribe((data: any) => {
          if (data.isStatus == true) {
            let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            this.snackBar.open('Address Saved Successfully', this.action ? this.actionButtonLabel : undefined, config);
            this.router.navigate(['/account/address'])
          } else {

          }
        })
      }
    }
  }

  saveAddShippingAddress() {
    console.log(this.addShippinngAddress)

    if (this.addShippinngAddress.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('All fields are mandtory in shipping information', this.action ? this.actionButtonLabel : undefined, config);
    } else if (this.addBillingAddress.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('All fields are mandtory in billing information', this.action ? this.actionButtonLabel : undefined, config);
    } else {
      let billingAddress = this.addBillingAddress.value.billaddress + ',' + this.addBillingAddress.value.billbuiding_name + ',' + this.addBillingAddress.value.billstreet_no + ',' + this.addBillingAddress.value.billcity + ',' + this.addBillingAddress.value.billstate + ',' + this.addBillingAddress.value.billzip_code + ',' + this.addBillingAddress.value.billcountry
      let shippingAddress = this.addShippinngAddress.value.shipaddress + ',' + this.addShippinngAddress.value.shipbuiding_name + ',' + this.addShippinngAddress.value.shipstreet_no + ',' + this.addShippinngAddress.value.shipcity + ',' + this.addShippinngAddress.value.shipstate + ',' + this.addShippinngAddress.value.shipzip_code + ',' + this.addShippinngAddress.value.shipcountry
      let obj = {
        "primaryAddress": billingAddress,
        "secondaryAddress": "",
        "shippingAddress": shippingAddress
      }
      console.log('diff', obj);
      this.homeService.saveAddress(obj).subscribe((data: any) => {
        if (data.isStatus == true) {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          this.snackBar.open('Address Saved Successfully', this.action ? this.actionButtonLabel : undefined, config);
          this.router.navigate(['/account/address'])
        } else {

        }
      })
    }
  }

  submitBillingAddress() {
    console.log(this.address.value);
    let billingAddress = this.address.value.address + ',' + this.address.value.buiding_name + ',' + this.address.value.street_no + ',' + this.address.value.city + ',' + this.address.value.state + ',' + this.address.value.zip_code + ',' + this.address.value.country
    let obj = {
      "primaryAddress": billingAddress,
      "secondaryAddress": "",
      "shippingAddress": this.userdetails.shippingAddress
    }
    console.log(obj);
    this.homeService.saveAddress(obj).subscribe((data: any) => {
      if (data.isStatus == true) {
        let config = new MatSnackBarConfig();
        config.duration = this.setAutoHide ? this.autoHide : 0;
        this.snackBar.open('Billing Address Updated Successfully', this.action ? this.actionButtonLabel : undefined, config);
        this.router.navigate(['/account/address'])
      } else {

      }
    })
  }

  submitShippingAddress() {
    console.log(this.address.value);

    let shippingAddress = this.address.value.address + ',' + this.address.value.buiding_name + ',' + this.address.value.street_no + ',' + this.address.value.city + ',' + this.address.value.state + ',' + this.address.value.zip_code + ',' + this.address.value.country
    let obj = {
      "primaryAddress": this.userdetails.primaryAddress,
      "secondaryAddress": "",
      "shippingAddress": shippingAddress
    }
    console.log(obj);
    this.homeService.saveAddress(obj).subscribe((data: any) => {
      if (data.isStatus == true) {
        let config = new MatSnackBarConfig();
        config.duration = this.setAutoHide ? this.autoHide : 0;
        this.snackBar.open('Shipping Address Updated Successfully', this.action ? this.actionButtonLabel : undefined, config);
        this.router.navigate(['/account/address'])
      } else {

      }
    })
  }

}
