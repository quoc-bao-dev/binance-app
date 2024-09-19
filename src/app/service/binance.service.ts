import { Injectable } from '@angular/core';
import Binance, { CandleChartInterval_LT } from 'binance-api-node';


@Injectable({
  providedIn: 'root'
})
export class BinanceService {

  private client;

  constructor() {
    // Khởi tạo Binance client
    this.client = Binance();
  }

  // Hàm lấy dữ liệu candlestick (nến) từ Binance
  getCandlestickData(symbol: string, interval: CandleChartInterval_LT): Promise<any> {
    return this.client.candles({
      symbol: symbol,
      interval: interval
    });
  }
}
