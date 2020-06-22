
import { EmbryoService } from '../../../Services/Embryo.service';
import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
@Component({
  selector: 'app-contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.scss']
})
export class ContactComponent implements OnInit {

  windowScrolled: boolean;
  contactInfo: any;
  emailPattern: any = /\S+@\S+\.\S+/;

  constructor(@Inject(DOCUMENT) private document: Document, public embryoService: EmbryoService) {
    this.embryoService.getContactInfo().valueChanges().subscribe(res => { this.contactInfo = res });
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
}

