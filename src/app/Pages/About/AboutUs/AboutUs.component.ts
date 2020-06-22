
import { EmbryoService } from '../../../Services/Embryo.service';
import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-AboutUs',
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.scss']
})
export class AboutUsComponent implements OnInit {
  windowScrolled: boolean;
  teamData: any;
  testimonialData: any;
  missionVisionData: any;
  aboutInfo: any;


  constructor(@Inject(DOCUMENT) private document: Document, private embryoService: EmbryoService) { }
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
    this.getAboutInfo();
    this.getMissionVision();
    this.getTestimonialData();
    this.getTeamData();
  }

  public getAboutInfo() {
    this.embryoService.getAboutInfo().valueChanges().subscribe(res => { this.aboutInfo = res });
  }

  public getMissionVision() {
    this.embryoService.getMissionVision().valueChanges().subscribe(res => { this.missionVisionData = res });
  }

  public getTeamData() {
    this.embryoService.getTeam().valueChanges().subscribe(res => { this.teamData = res });
  }

  public getTestimonialData() {
    this.embryoService.getTestimonial().valueChanges().subscribe(res => { this.testimonialData = res });
  }
}

