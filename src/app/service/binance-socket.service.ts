import Binance from 'binance-api-node';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinanceSocketService {
  
  private client = Binance()
  private depthDataSubject = new Subject<any>()
  private priceSubject = new Subject<any>();

  depthData$ = this.depthDataSubject.asObservable()
  public price$ = this.priceSubject.asObservable();
  constructor() { 
  }

  connectToDepthStream(symbol: string) {
    this.client.ws.depth(symbol, (depth) => {
      this.depthDataSubject.next(depth)
    })
  }

  connectToPriceStream(symbol: string) {
    this.client.ws.ticker(symbol, (ticker) => {
      this.priceSubject.next(ticker); 
    });
  }
}
