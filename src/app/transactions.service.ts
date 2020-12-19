import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Transaction} from "./model/Transaction";
import { map } from "rxjs/operators"; 

@Injectable()
export class TransactionsService {

  transactions: Transaction[];
  constructor(private _http: HttpClient) { }

  get(): Observable<Transaction[]> {
    return this._http.get('./assets/mock/transactions.json')
    .pipe(map((res:any) => {
      this.transactions = res.data;
      return this.transactions;
    }));
  }
}
