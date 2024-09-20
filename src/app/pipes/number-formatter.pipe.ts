import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter',
  standalone: true
})
export class NumberFormatterPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'T'; // Tỷ (Billion)
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M'; // Triệu (Million)
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'K'; // Nghìn (Thousand)
    } else {
      return value.toString(); // Trả về giá trị gốc nếu nhỏ hơn 1000
    }
  }

}
