import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'embryo-Sales',
  templateUrl: './Sales.component.html',
  styleUrls: ['./Sales.component.scss']
})
export class SalesComponent implements OnInit {

  @Input() advitiseZero: any;

  constructor(private router: Router) {
    console.log('akshatha checking0', this.advitiseZero);
  }

  ngOnInit() {

  }

  navigateToProducts() {

    this.router.navigate(['/products', { subId: 0, subName: "Gym Equipments" }]);

  }


}
