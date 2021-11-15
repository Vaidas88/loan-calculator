import {Children} from "../types/children.type";
import {Coapplicants} from "../types/coapplicants.type";

export interface ILoanCalc {
  monthlyIncome: number;
  requestedAmount: number;
  loanTerm: number;
  children: Children;
  coapplicant:Coapplicants;
}
