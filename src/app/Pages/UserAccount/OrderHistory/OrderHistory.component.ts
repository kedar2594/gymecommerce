import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

const order_history = [
  { position: 1, orderid: 1801, name: 'LEGITIM', price: 1.0079, status: 'Sent', action: '' },
  { position: 2, orderid: 1832, name: 'GRUNDTAL', price: 4.0026, status: 'In processing', action: '' },
  { position: 3, orderid: 1881, name: 'BOHOLMEN', price: 6.941, status: 'Sent', action: '' },
  { position: 4, orderid: 1832, name: 'ROSTAD LÖK', price: 9.0122, status: 'Return', action: '' },
  { position: 5, orderid: 1810, name: 'TÅRTA CHOKLADKROKANT', price: 10.811, status: 'Sent', action: '' },
];

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'orderid', 'name', 'price', 'status', 'action'];
  dataSource = order_history;
  userOrderDetails: any = [];
  orderDetails: any = [];
  p: number = 1;
  number: any;
  constructor(private router: Router, public homeService: HomeTwoService) {
    this.viewAllOrderByUserId();
    this.number = 7;
  }

  ngOnInit() {
  }

  viewAllOrderByUserId() {
    this.homeService.viewOrderByUserById().subscribe((data: any) => {
      if (data.isStatus == true) {
        this.orderDetails = data.response;
        console.log(this.orderDetails);

      }
    })
  }

  redirectToFinal(item) {
    console.log(item);
    let orderId = item.orderId;
    //  window.location.href = '/checkout/final-receipt;orderId=' + item.orderId;
    this.router.navigate(['/checkout/final-receipt', { 'orderId': btoa(orderId) }])

  }

  pageChanged(event) {
    // console.log(event)
    this.p = event;
  }
}
