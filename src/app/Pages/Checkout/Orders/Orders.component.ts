import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.scss']
})



export class OrdersComponent {
  orderDetails: any = [];
  productDetails: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, public dialogRef: MatDialogRef<OrdersComponent>) {
    console.log(data);
    this.orderDetails = data;
    this.productDetails = this.orderDetails.orderDetails
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
