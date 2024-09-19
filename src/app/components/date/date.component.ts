import { Component, OnInit } from '@angular/core';
import { BinanceService } from '../../service/binance.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [NgFor],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent implements OnInit {
  candlestickData: any[] = [];

  constructor(private binanceService: BinanceService) {}

  ngOnInit(): void {
    // Gọi service để lấy dữ liệu
    // this.binanceService.getCandlestickData('BTCUSDT', '1d').then(
    //   data => {
    //     this.candlestickData = data;
    //     console.log(this.candlestickData);
    //   },
    //   error => {
    //     console.error('Error fetching candlestick data', error);
    //   }
    // );


    this.binanceService.getTodayCandlestickData('BTCUSDT', '1m').then(
      data => {
        this.candlestickData = data;
        console.log(this.candlestickData);
      },
      error => {
        console.error('Error fetching today\'s candlestick data', error);
      }
    );
  }
}
