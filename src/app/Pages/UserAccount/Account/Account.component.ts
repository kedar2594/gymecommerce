import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {

  windowScrolled: boolean;
  details: any;
  token: any;

  constructor(@Inject(DOCUMENT) private document: Document, private homeService: HomeTwoService) {
    // this.details = JSON.parse(localStorage.getItem('userDetails'));
    this.token = localStorage.getItem('token');
    this.viewprofile();
    // console.log('details lofin', this.details);
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
    window.scrollTo(0, 0)
  }
  viewprofile() {
    this.homeService.viewprofiledetails().subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log('profiledetailssssss', data.response);
        this.details = data.response;
      } else {
      }
    })
  }
}
