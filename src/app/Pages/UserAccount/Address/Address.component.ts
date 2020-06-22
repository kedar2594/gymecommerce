import { Component, OnInit } from '@angular/core';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';

@Component({
  selector: 'app-Address',
  templateUrl: './Address.component.html',
  styleUrls: ['./Address.component.scss']
})
export class AddressComponent implements OnInit {

  userdetails: any;

  constructor(private homeService: HomeTwoService) {
    this.viewprofile();
  }

  ngOnInit() {

  }

  viewprofile() {
    this.homeService.viewprofiledetails().subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log('profiledetailssssss', data.response);
        this.userdetails = data.response;
        console.log(this.userdetails);

      } else {
      }
    })
  }

}
