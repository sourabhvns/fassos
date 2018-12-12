import { Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ManageService } from '../../manage/manage.service';
import { WebsocketService, ORDER } from '../dashboard.service';
import { OrderData } from '../model';
import {MatFormFieldModule, MatButtonModule, MatCheckboxModule,
  MatMenuModule, MatInputModule, MatDialogModule,
  MatSelectModule, MatNativeDateModule} from '@angular/material';

@Component({
  selector: 'app-food-dashboard',
  templateUrl: './food-dashboard.component.html',
  styleUrls: ['./food-dashboard.component.css']
})
export class FoodDashboardComponent implements OnInit {
  constructor(private socketService: WebsocketService, private dashboardService: DashboardService, private manageService: ManageService) {
    this.initIoConnection();
   }
  messages: OrderData[] = [];
  messageContent: string;
  ioConnection: any;
  timestamp: any;
  option = ['Last 1 Hour', '1 day', '1 Month'];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Orders'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0], label: 'Series A'},
    {data: [0], label: 'Series B'},
    {data: [0], label: 'Series A'},
    {data: [0], label: 'Series B'},
    {data: [0], label: 'Series A'}
  ];
  ngOnInit() {
    this.socketService.orderData.subscribe(
      (order) => {
        console.log(order);
        this.barChartData = [];
        Object.keys(order).forEach(key => {
          this.barChartData.push({data: [order[key]], label: key.toUpperCase()});
        });
        console.log(this.barChartData);
      }
    );
  }

  private initIoConnection(): void {
    this.socketService.connect();
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.socketService.send('orders', message);
    this.messageContent = null;
  }

  onChange(event) {
    console.log(event);
    if (event.value === 'Last 1 Day') {
      console.log(new Date().getTime());
      this.timestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
    } else if (event.value === 'Last 1 Hour') {
      console.log(new Date().getTime());
      this.timestamp = new Date().getTime() - (60 * 60 * 1000);
    } else {
      this.timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
    }
    this.dashboardService.filter(this.timestamp).subscribe(res => {
      console.log(res);
      if (res && res['data']) {
        this.barChartData = [];
        Object.keys(res['data']).forEach(key => {
          this.barChartData.push({data: [res['data'][key]], label: key.toUpperCase()});
        });
        console.log(this.barChartData);
      }
    });
  }

  downloadReport() {
    this.manageService.getOrdersList().subscribe(res => {
      console.log(res);
      if (res && res['data']) {
        this.downloadFile(res['data'], 'orderReport');
      }
    });
  }

  downloadFile(data: any, filename: string) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    const blob = new Blob([csvArray], {type: 'text/csv' });
   // saveAs(blob, filename + '.csv');
   const url = window.URL.createObjectURL(blob);
    window.open(url);
}

}
