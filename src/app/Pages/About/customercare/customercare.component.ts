
import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-customercare',
  templateUrl: './customercare.component.html',
  styleUrls: ['./customercare.component.css']
})
export class CustomercareComponent implements OnInit {
  windowScrolled: boolean;
  contactForm: FormGroup;
  emailPattern: any = /\S+@\S+\.\S+/;
  constructor(@Inject(DOCUMENT) private document: Document, private formGroup: FormBuilder) { }
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
    window.scrollTo(0, 0);
    this.contactForm = this.formGroup.group({
      first_name: ['', { validators: [Validators.required] }],
      mobile_number: ['', { validators: [Validators.required] }],
      product: ['', { validators: [Validators.required] }],
      date: ['', { validators: [Validators.required] }],
      message: ['', { validators: [Validators.required] }]
    })
  }
  public submitForm() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value)
    } else {
      for (let i in this.contactForm.controls) {
        this.contactForm.controls[i].markAsTouched();
      }
    }
  }
}
