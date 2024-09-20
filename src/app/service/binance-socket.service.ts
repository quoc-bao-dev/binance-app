import Binance from 'binance-api-node';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinanceSocketService {
  
  private client = Binance()
  private depthDataSubject = new Subject<any>()

  depthData$ = this.depthDataSubject.asObservable()

  constructor() { 
  }

  connectToDepthStream(symbol: string) {
    this.client.ws.depth(symbol, (depth) => {
      this.depthDataSubject.next(depth)
    })
  }
}
