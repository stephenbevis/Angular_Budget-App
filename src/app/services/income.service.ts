import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

// Models
import {Income} from '../models/Income';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  incomeUrl: string = 'http://localhost:3000/income';

  income: Income[];

  incomeData: Observable<Array<any>>;

  constructor(private http: HttpClient) { }

  getIncome(): Observable<Income[]> {
    return this.http.get<Income[]>(this.incomeUrl);
  }

  saveIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(this.incomeUrl, income, httpOptions);
  }

  updateIncome(income: Income): Observable<Income> {
    const url = `${this.incomeUrl}/${income.id}`;
    return this.http.put<Income>(url, income, httpOptions);
  }

  removeIncome(income: Income | number): Observable<Income> {
    const id = typeof income === 'number' ? income : income.id;
    const url = `${this.incomeUrl}/${id}`;
    return this.http.delete<Income>(url, httpOptions);
  }
}
