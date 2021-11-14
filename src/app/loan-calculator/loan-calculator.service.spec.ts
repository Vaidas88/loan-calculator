import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { LoanCalculatorService } from './loan-calculator.service';

describe('LoanCalculatorService', () => {
  let service: LoanCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [LoanCalculatorService]});
    service = TestBed.inject(LoanCalculatorService);
  });

  
});
