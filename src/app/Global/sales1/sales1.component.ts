import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'embryo-Sales1',
  templateUrl: './sales1.component.html',
  styleUrls: ['./sales1.component.scss']
})
export class Sales1Component implements OnInit {
  @Input() advitiseOne: any;
  constructor(private router: Router) { }

  ngOnInit() {
    console.log('akshatha checking1', this.advitiseOne);
  }

  navigateToProducts() {

    this.router.navigate(['/products', { subId: 0, subName: "Gym Equipments" }]);

  }

}
