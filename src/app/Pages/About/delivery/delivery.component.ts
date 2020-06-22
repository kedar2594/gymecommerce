
import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  windowScrolled: boolean;
  constructor(@Inject(DOCUMENT) private document: Document,) { }

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

}
