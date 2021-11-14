import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ILoanCalc} from "./iloan-calc";
import {environment as env} from "../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {ILoanResult} from "./iloan-result";

@Injectable({
  providedIn: 'root'
})
export class LoanCalculatorService {

  httpHeader = {
    headers: new HttpHeaders({
      "X-API-KEY": env.xApiKey
    })
  }

  constructor(private httpClient: HttpClient) { }

  postLoanCalcForm(data: ILoanCalc): Observable<ILoanResult>{
    return this.httpClient.post<ILoanResult>(`${env.apiUrl}`, JSON.stringify(data), this.httpHeader)
      .pipe(
        retry(3),
        catchError(this.handleApiError)
      );
  }

  private handleApiError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an error to front
    return throwError(
      error.error.fields);
  }
}
