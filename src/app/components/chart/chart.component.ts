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

  ngAfterViewInit(): void {
    this.loadTradingViewWidget();
  }

  loadTradingViewWidget(): void {
    new window.TradingView.widget({
      "width": '100%',
      "height": '100%',
      "symbol": "BINANCE:BTCUSDT", // Cặp giao dịch
      "interval": "D", // Khoảng thời gian
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_chart"
    });
  }
}
