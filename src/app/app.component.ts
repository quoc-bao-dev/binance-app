import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TradingviewChartComponent } from './components/chart/chart.component';
import { DateComponent } from "./components/date/date.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TradingviewChartComponent, DateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'binance';
}

