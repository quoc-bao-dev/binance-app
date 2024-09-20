import { TestBed } from '@angular/core/testing';

import { BinanceSocketService } from './binance-socket.service';

describe('BinanceSocketService', () => {
  let service: BinanceSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinanceSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
