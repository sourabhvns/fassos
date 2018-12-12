import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, from } from 'rxjs';
// import * as socketIo from 'socket.io-client';
import { OrderData } from './model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {environment } from '../../environments/environment';

export let ORDER = {};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = '';
  private socket;
  constructor( private http: HttpClient) { }
  filter(time) {
    this.url = environment.api + '/orders';
    const data: any = {
        'created__gte' : time,
        'graph' : true
    };
    return this.http.get<any>(this.url, {'params' : data});
  }

}



// WebSocket
@Injectable()
export class WebsocketService {
    orderData: EventEmitter<any> = new EventEmitter();
    ws: any;
    data: any;

    constructor() {
    }

    connect(callback?: Function) {

        const url = 'ws://127.0.0.1:3001/orders?';
        this.ws = new WebSocket(url);
        console.log(this.ws.readyState);

        this.ws.onmessage = this.onmessage.bind(this);

        this.ws.onopen = (d) => {};
        this.ws.onclose = this.onclose.bind(this);
        this.ws.onerror = this.onerror.bind(this);
        return this.ws;
    }

    onmessage(event) {
        const d = JSON.parse(event.data);
        console.log(d);
        this.data = d;
        ORDER = d['data'];
        this.orderData.emit(ORDER);
    }

    onclose(event) {
        console.log('on close web socket', event);
    }

    onerror(event) {
        console.log('on error');
    }

    send(event, data) {
      this.ws.send(JSON.stringify({ event: event, data: data  }));
    }
}
