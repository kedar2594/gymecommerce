import { Component, OnInit, Input } from '@angular/core';
import { EmbryoService } from './../../Services/Embryo.service';
declare var $: any;

@Component({
  selector: 'embryo-HeaderUserProfileDropdown',
  templateUrl: './HeaderUserProfileDropdown.component.html',
  styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})
export class HeaderUserProfileDropdownComponent implements OnInit {
  @Input() alluserdetail: any;
  alluserdetail1: any;
  showdata: boolean = true;
  hide: boolean;
  constructor(public embryoService: EmbryoService
  ) {
    this.alluserdetail1 = JSON.parse(localStorage.getItem("userDetails"));
    console.log(this.alluserdetail1);
    if (this.alluserdetail1 != null) {
      setTimeout(() => {
        $("#profile").show();
        $("#login").hide();
      }, 1500);

    } else {
      if (this.alluserdetail1 == null) {
        console.log("nulllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
        setTimeout(() => {
          $("#profile").hide();
          $("#login").show();
        }, 1500);
      }


    }

  }


  ngOnInit() {

  }
  logout() {
    console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    localStorage.clear();
    this.embryoService.navigate('/session/signin', []);

  }
}
