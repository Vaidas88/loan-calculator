import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCalculatorComponent } from './loan-calculator.component';
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LoanCalculatorComponent', () => {
  let component: LoanCalculatorComponent;
  let fixture: ComponentFixture<LoanCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanCalculatorComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when click occurs on submit button it should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('loanCalcForm should be valid when form validations are fullfiled', () => {
    const monthlyIncome: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="monthlyIncome"]')).nativeElement;
    const requestedAmount: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="requestedAmount"]')).nativeElement;
    const loanTerm: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="loanTerm"]')).nativeElement;
    const children: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="children"]')).nativeElement;
    const coapplicant: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="coapplicant"]')).nativeElement;

    monthlyIncome.value = '500';
    requestedAmount.value = '20000';
    loanTerm.value = '36';
    children.value = 'NONE';
    coapplicant.value = 'NONE';

    monthlyIncome.dispatchEvent(new Event('input'));
    requestedAmount.dispatchEvent(new Event('input'));
    loanTerm.dispatchEvent(new Event('input'));
    children.dispatchEvent(new Event('input'));
    coapplicant.dispatchEvent(new Event('input'));

    const isLoanCalcFormValid = component.loanCalcForm.valid;
    fixture.whenStable().then(() => {
      expect(isLoanCalcFormValid).toBeTruthy();
    });
  });

  it('loanCalcForm should be invalid when form validations are not fullfiled', () => {
    const monthlyIncome: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="monthlyIncome"]')).nativeElement;
    const requestedAmount: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="requestedAmount"]')).nativeElement;
    const loanTerm: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="loanTerm"]')).nativeElement;
    const children: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="children"]')).nativeElement;
    const coapplicant: HTMLInputElement = fixture.debugElement.query(By.css('[formcontrolname="coapplicant"]')).nativeElement;

    monthlyIncome.value = '50';
    requestedAmount.value = '2000';
    loanTerm.value = '3';
    children.value = 'NONE_';
    coapplicant.value = 'NONE_';

    monthlyIncome.dispatchEvent(new Event('input'));
    requestedAmount.dispatchEvent(new Event('input'));
    loanTerm.dispatchEvent(new Event('input'));
    children.dispatchEvent(new Event('input'));
    coapplicant.dispatchEvent(new Event('input'));

    const isLoanCalcFormValid = component.loanCalcForm.valid;
    fixture.whenStable().then(() => {
      expect(isLoanCalcFormValid).toBeFalsy();
    });
  });
});
