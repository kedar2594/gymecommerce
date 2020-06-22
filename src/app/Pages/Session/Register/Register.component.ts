import { EmbryoService } from './../../../Services/Embryo.service';
import { ToastcompComponent } from './../toastcomp/toastcomp.component';
import { Component, OnInit } from '@angular/core';
import { SessionService } from './../session.service';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid);
  }
}


@Component({
  selector: 'embryo-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})



export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  userName: any;
  lastName: any;
  firstName: any;
  fullName: any;
  email: any;
  password: any;
  phoneNumber: any;
  confirmPassword: any;
  durationInSeconds = 2;
  message: string = 'Fields marked with * are mandatory';
  actionButtonLabel: string = '';
  action: boolean = true;
  autoHide: number = 2000;
  setAutoHide: boolean = true;

  constructor(
    public embryoService: EmbryoService,
    public snackBar: MatSnackBar,
    public sessionService: SessionService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({

      userName: new FormControl('', [Validators.minLength(5)]),
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      email: new FormControl('', [Validators.email]),

      PhoneNumber: new FormControl('', [Validators.pattern('[6-9]\\d{9}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),

    });
  }

  register() {
    if (this.firstName == undefined || this.lastName == undefined || this.email == undefined || this.phoneNumber == undefined || this.password == undefined) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;

      this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    } else {
      this.fullName = this.firstName + ' ' + this.lastName;
      let obj = {
        "userName": this.userName,
        "password": this.password,
        "userFirstName": this.firstName,
        "userLastName": this.lastName,
        "userFullName": this.fullName,
        "emailId": this.email,
        "phoneNumber": this.phoneNumber.toString()
      }
      console.log(obj);

      this.sessionService.registerUser(obj).subscribe((data: any) => {
        if (data.isStatus == true) {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          this.snackBar.open('Register Succussfully', this.action ? this.actionButtonLabel : undefined, config);
          this.embryoService.navigate('/session/signin', []);
        } else {

        }
      })
    }
  }

  checkUserChanged() {
    console.log(this.userName);
    this.sessionService.checkUserName(this.userName).subscribe((data: any) => {
      if (data.isStatus == true) {
        // let config = new MatSnackBarConfig();
        // config.duration = this.setAutoHide ? this.autoHide : 0;
        // this.snackBar.open(data.response, this.action ? this.actionButtonLabel : undefined, config);
      } else {
        this.userName = "";
        let config = new MatSnackBarConfig();
        config.duration = this.setAutoHide ? this.autoHide : 0;
        this.snackBar.open(data.response, this.action ? this.actionButtonLabel : undefined, config);
      }
    })
  }


}
