import { Component, OnInit } from '@angular/core';
import { BinanceService } from '../../service/binance.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BinanceSocketService } from '../../service/binance-socket.service';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';
import { Title } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [NgFor, NumberFormatterPipe,DecimalPipe, NgClass, NgIf],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
  providers: [DecimalPipe]
})
export class DateComponent implements OnInit {
  orderBookData: any = {};
  currentPriceData: any
  
  prePrice = 0
  currentPrice = 0
  isBigger : boolean = true
  private temp: any[] = []
  constructor(private binanceService: BinanceSocketService, private titleService: Title, private decimalPipe: DecimalPipe) {}

  async ngOnInit(): Promise<void> {
    // Lấy dữ liệu order book cho BTCUSDT
    try {

      this.binanceService.connectToDepthStream('BTCUSDT')
      this.binanceService.connectToPriceStream('BTCUSDT');

      this.binanceService.depthData$.subscribe((data) => {
        this.orderBookData = data

        this.orderBookData.bidDepth.length=20
        this.orderBookData.askDepth.length=20
        
      })

       this.binanceService.price$.subscribe((priceData) => {
        this.currentPriceData = priceData;
        
        const title = `${this.decimalPipe.transform(this.currentPrice)} | BTCUSDT`
        this.setTitle(title)
        
        console.log(priceData);
        
      
        this.currentPrice = this.currentPriceData.curDayClose
        this.temp.push(this.currentPrice)
        if (this.temp.length >= 2) {
          this.prePrice =  this.temp.shift()
          
        }

        this.currentPrice

        this.isBigger = Number(this.currentPrice) >= Number(this.prePrice)
        
      });


      
    } catch (error) {
      console.log(error);
    }
  }

  setTitle (title: string) {
    this.titleService.setTitle(title)
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
