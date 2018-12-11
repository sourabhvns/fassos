import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  url = '';
  constructor(private http: HttpClient) { }

  getOrdersList() {
    this.url = environment.api + '/orders';
    return this.http.get<any>(this.url);
  }
  addorder() {
    this.url = environment.api + '/orders';
    console.log(this.url);
    const data = {
      'user': 'sourabh',
      'address': 'jgfj'
    };
    return this.http.post<any>(this.url, data);
  }

  updateOrder(id) {
    const data = {};
    this.url = environment.api + '/orders/' + id + '/delivered' ;
    return this.http.post<any>(this.url, data);
  }

  cancelOrder(id) {
    const data = {};
    this.url = environment.api + '/orders/' + id + '/canceled' ;
    return this.http.post<any>(this.url, data);
  }
}
