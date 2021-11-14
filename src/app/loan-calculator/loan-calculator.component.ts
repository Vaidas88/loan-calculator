import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ILoanCalc} from "./iloan-calc";
import {LoanCalculatorService} from "./loan-calculator.service";
import {ILoanResult} from "./iloan-result";

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {
  public title = 'Loan Calculator';
  private loanCalc?: ILoanCalc;
  public loanResult?: ILoanResult | null;
  public loanCalcErrors:{ [key: string]: string; } = {};

  public loanCalcForm = this.formBuilder.group({
    monthlyIncome: [500, Validators.compose([
      Validators.required, Validators.min(500), Validators.pattern("^[0-9]*$")
    ])],
    requestedAmount: [20000, Validators.compose([
      Validators.required, Validators.min(20000), Validators.pattern("^[0-9]*$")
    ])],
    loanTerm: [36, Validators.compose([
      Validators.required, Validators.min(36), Validators.max(360), Validators.pattern("^[0-9]*$")
    ])],
    children: ['NONE', Validators.compose([
      Validators.required, Validators.pattern("^(NONE|SINGLE|MULTIPLE)$")
    ])],
    coapplicant: ['NONE', Validators.compose([
      Validators.required, Validators.pattern("^(NONE|SINGLE_BORROWER|MULTIPLE_BORROWERS)$")
    ])]
  });

  constructor(private formBuilder: FormBuilder, private loanCalcService: LoanCalculatorService) { }

  get f() {
    return this.loanCalcForm.controls;
  }

  ngOnInit(): void {
    this.loanCalcForm.statusChanges.subscribe(status => {
      this.loanResult = null;
      this.loanCalcErrors = {};
      if(status === 'INVALID'){
        this.handleFormError();
      }
    });
  }

  handleFormError(): void {
    for(let key in this.f){
      if(this.f[key].errors !== null)
        switch(key){
          case 'monthlyIncome':
            this.loanCalcErrors[key] = 'Monthly income is too low. Minimum income is 500 EUR';
            break;
          case 'requestedAmount':
            this.loanCalcErrors[key] = 'Requested Amount too low. Minimum loan of 20000 available';
            break;
          case 'loanTerm':
            this.loanCalcErrors[key] = 'Loan term is too short. Minimum term: 36 months';
            break;
          case 'children':
            this.loanCalcErrors[key] = 'Wrong or missing children status';
            break;
          case 'coapplicant':
            this.loanCalcErrors[key] = 'Wrong or missing coapplicant status';
            break;
          default:
            this.loanCalcErrors['unknown'] = 'Unknown error occured';
        }
      console.log(key)
    }
  }

  onSubmit() {
    this.loanCalc = {
      monthlyIncome: this.loanCalcForm.value.monthlyIncome * 1000,
      requestedAmount: this.loanCalcForm.value.requestedAmount * 1000,
      loanTerm: this.loanCalcForm.value.loanTerm,
      children: this.loanCalcForm.value.children,
      coapplicant: this.loanCalcForm.value.coapplicant
    };

    this.loanCalcService.postLoanCalcForm(this.loanCalc).subscribe((result) => {
      this.loanResult = {
        loanAmount: result.loanAmount / 1000,
        interestRate: result.interestRate / 1000
      };
    }, error => {
      error.forEach((err:any) => {
        this.loanCalcErrors[err.params] = err.message;
      });
    });
  }
}
