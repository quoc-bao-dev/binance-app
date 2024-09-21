import { Component, OnInit } from '@angular/core';
import { BinanceSocketService } from '../../service/binance-socket.service';
import { DecimalPipe, NgClass, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-change-info',
  standalone: true,
  imports: [NgClass, DecimalPipe,PercentPipe ],
  templateUrl: './change-info.component.html',
  styleUrl: './change-info.component.css'
})
export class ChangeInfoComponent implements OnInit {
  orderBookData: any = {};
  currentPriceData: any
  prePrice = 0
  currentPrice = 0
  changePercent = 0
  highPrice = 0 
  lowPrice = 0
  volume = 0
  isBigger : boolean = true
  private temp: any[] = []

  constructor(private binanceService : BinanceSocketService) {}
  async ngOnInit(): Promise<void> {
    // Lấy dữ liệu order book cho BTCUSDT
    try {


      this.binanceService.depthData$.subscribe((data) => {
        this.orderBookData = data
        this.orderBookData.bidDepth.length=20
        this.orderBookData.askDepth.length=20
      })

        this.binanceService.price$.subscribe((priceData) => {
        this.currentPriceData = priceData;
        this.currentPrice = this.currentPriceData.curDayClose
        this.temp.push(this.currentPrice)
        if (this.temp.length >= 2) {
          this.prePrice =  this.temp.shift()
        }

        this.isBigger = Number(this.currentPrice) >= Number(this.prePrice)

        //change percent
        this.changePercent = priceData.priceChangePercent

        // high and low
        this.highPrice = priceData.high
        this.lowPrice = priceData.low

        this.volume = priceData.volume
        
      });
      
    } catch (error) {
      console.log(error);
    }
  }
}
