import { Component, AfterViewInit } from '@angular/core';

declare global {
  interface Window {
    TradingView: any;
  }
}

@Component({
  standalone: true,
  selector: 'app-tradingview-chart',
  templateUrl: './chart.component.html',
})

export class TradingviewChartComponent implements AfterViewInit {

  theme: string =  "dark"

  ngAfterViewInit(): void {
    this.loadTradingViewWidget();
  }

  loadTradingViewWidget(): void {
    new window.TradingView.widget({
      "width": '100%',
      "height": '100%',
      "symbol": "BINANCE:BTCUSDT", // Cặp giao dịch
      "interval": "1", // Khoảng thời gian
      "timezone": "Etc/UTC",
      "theme": this.theme,
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_chart"
    });
  }

  changetheme () {
    this.theme  =  this.theme === 'light' ? 'dark' : 'light'
    this.loadTradingViewWidget()
  }
}
