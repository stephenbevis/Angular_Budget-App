import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

// Models
import {Bill} from '../models/Bill';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class BillService {

  billsUrl: string = 'http://localhost:3000/bills';

  bills: Bill[];

  billData: Observable<Array<any>>;

  constructor(private http: HttpClient) {
    
  }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billsUrl);
  }

  saveBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billsUrl, bill, httpOptions);
  }

  updateBill(bill: Bill): Observable<Bill> {
    const url = `${this.billsUrl}/${bill.id}`;
    return this.http.put<Bill>(url, bill, httpOptions);
  }

  removeBill(bill: Bill | number): Observable<Bill> {
    const id = typeof bill === 'number' ? bill : bill.id;
    const url = `${this.billsUrl}/${id}`;
    return this.http.delete<Bill>(url, httpOptions);
  }
}
