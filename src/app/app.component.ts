import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TradingviewChartComponent } from './components/chart/chart.component';
import { DateComponent } from "./components/date/date.component";
import { DecimalPipe, NgClass } from '@angular/common';
import { BinanceSocketService } from './service/binance-socket.service';
import { ChangeInfoComponent } from "./components/change-info/change-info.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TradingviewChartComponent, DateComponent, NgClass, DecimalPipe, ChangeInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  

}

