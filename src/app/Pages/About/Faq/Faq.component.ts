
import { EmbryoService } from '../../../Services/Embryo.service';
import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-Faq',
  templateUrl: './Faq.component.html',
  styleUrls: ['./Faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqData: any
  windowScrolled: boolean;
  constructor(@Inject(DOCUMENT) private document: Document, public embryoService: EmbryoService) { }

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
    window.scrollTo(0, 0);
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.embryoService.getFaq().valueChanges().subscribe(res => { this.faqData = res });
  }

}
