import { Component, OnInit } from '@angular/core';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
  token: any;

  details: any;
  constructor(private homeService: HomeTwoService) {
    this.token = localStorage.getItem('token');
    this.viewprofile();
  }

  ngOnInit() {
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
