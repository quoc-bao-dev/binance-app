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
  getTodayCandlestickData(symbol: string, interval: CandleChartInterval_LT): Promise<any> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // thời gian bắt đầu ngày hiện tại
    const currentTime = now.getTime(); // thời gian hiện tại

    return this.client.candles({
      symbol: symbol,
      interval: interval,
      startTime: startOfDay, // bắt đầu từ đầu ngày
      endTime: currentTime // đến thời gian hiện tại
    });
  }
}
