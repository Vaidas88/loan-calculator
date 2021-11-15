import { TestBed } from '@angular/core/testing';
import { LoanCalculatorService } from './loan-calculator.service';
import {Children} from "./types/children.type";
import {Coapplicants} from "./types/coapplicants.type";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { of } from 'rxjs';

describe('LoanCalculatorService', () => {
  let service: LoanCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanCalculatorService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoanCalculatorService);
  });

  it('should return ILoanResult', () => {
    let loanResult = {
      loanAmount: 20000000,
      interestRate: 2500
    };
    let childrenValue: Children = 'NONE';
    let coapplicantValue: Coapplicants = 'NONE';
    let loanCalc = {
      monthlyIncome: 500000,
      requestedAmount: 20000000,
      loanTerm: 36,
      children: childrenValue,
      coapplicant: coapplicantValue
    }

    service.postLoanCalcForm(loanCalc).subscribe(result => {
      expect(result).toEqual(loanResult);
    });

  });
});
