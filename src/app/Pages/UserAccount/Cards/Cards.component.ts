import { Component, OnInit } from '@angular/core';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';

@Component({
  selector: 'app-Cards',
  templateUrl: './Cards.component.html',
  styleUrls: ['./Cards.component.scss']
})
export class CardsComponent implements OnInit {
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
        console.log('cardsssssssssss', data.response);
        console.log('cardsssssssssss', data.response.customerCard);

        this.details = data.response.customerCard;
      } else {
      }
    })
  }
}
