import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  constructor(private manageService: ManageService) { }
  ordersList = [];
  header = ['Order ID', 'Status', 'Order Date', 'Action'];
  ngOnInit() {
    this.getOrdersList();
  }

  getOrdersList() {
    this.manageService.getOrdersList().subscribe(res => {
      console.log(res);
      if (res && res['data']) {
        this.ordersList = res['data'];
        this.ordersList.forEach(element => {
          element.created = new Date(element.created).toUTCString();
        });
        console.log(this.ordersList);
      }
    });
  }

  update(id) {
    this.manageService.updateOrder(id).subscribe(res => {
      console.log(res);
      if (res && res['data']) {
        this.ordersList = res['data'];
        this.getOrdersList();
      }
    });
  }

  cancel(id) {
    this.manageService.cancelOrder(id).subscribe(res => {
      console.log(res);
      if (res && res['data']) {
        this.ordersList = res['data'];
        this.getOrdersList();
      }
    });
  }
  add() {
    this.manageService.addorder().subscribe(res => {
      console.log(res);
      if (res && res['data']) {
        this.ordersList = res['data'];
        this.getOrdersList();
      }
    });
  }

}
