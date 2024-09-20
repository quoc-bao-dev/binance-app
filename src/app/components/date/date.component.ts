import { Component, OnInit } from '@angular/core';
import { BinanceService } from '../../service/binance.service';
import { NgFor } from '@angular/common';
import { BinanceSocketService } from '../../service/binance-socket.service';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [NgFor, NumberFormatterPipe],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent implements OnInit {
  orderBookData: any = {};
  private orderBookSubData : any

  constructor(private binanceService: BinanceSocketService) {}

  async ngOnInit(): Promise<void> {
    // Lấy dữ liệu order book cho BTCUSDT
    try {

      this.binanceService.connectToDepthStream('BTCUSDT')

      this.orderBookSubData = this.binanceService.depthData$.subscribe((data) => {
        this.orderBookData = data
        console.log(data);

        this.orderBookData.bidDepth.length=20
        this.orderBookData.askDepth.length=20
        
      })

      
    } catch (error) {
      console.log(error);
    }
  }

  getTotalBuy() : number{
    const total = this.orderBookData.bidDepth.reduce((( sum: number, _bid: any) => sum + _bid.price* _bid.quantity ),0)
    return total
  }
  getMaxBuy() {
    return Math.max(...this.orderBookData.bidDepth.map((_i: any) => _i.price * _i.quantity))
  }

  getTotalSell() {
    const total = this.orderBookData.askDepth.reduce((( sum: number, _ask: any) => sum + _ask.price* _ask.quantity ),0)
    return total
  }
  geMaxSell() {
    return Math.max(...this.orderBookData.askDepth.map((_i: any) => _i.price * _i.quantity))
  }

}
