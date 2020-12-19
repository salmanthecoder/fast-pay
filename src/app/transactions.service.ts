import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {Transaction} from "./model/Transaction";
import { map } from "rxjs/operators"; 


@Injectable()
export class TransactionsService {

  transactions: Transaction[];
  public observableTransactions: BehaviorSubject<Transaction[]>;
  constructor(private _http: HttpClient) {
    this.observableTransactions = <BehaviorSubject<Transaction[]>>new BehaviorSubject([]);
    this.get();
   }

  get(): Observable<Transaction[]> {
    if(this.transactions && this.transactions.length !=0) {
      return this.observableTransactions;
    }
    return this._http.get('/api/data')
    .pipe(map((res:any) => {
      this.transactions = res.data;
      this.observableTransactions.next(Object.assign([], this.transactions));
      return this.transactions;
    }));
  }

  getTransactions(): Observable<Transaction[]> {
    return this.get();
  }

  addTransactions(transaction: Transaction) {
    const currentValue = this.observableTransactions.value;
        const updatedValue = [transaction, ...currentValue];
        this.observableTransactions.next(updatedValue);
  }
}