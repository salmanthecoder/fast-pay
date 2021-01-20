import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {Transaction} from './model/Transaction';
import { map } from 'rxjs/operators';


@Injectable()
export class TransactionsService {

  transactions: Transaction[];
  public observableTransactions: Subject<Transaction[]> ;
  constructor(private http: HttpClient) {
    this.observableTransactions = new Subject<Transaction[]>();
   }

  get(): Observable<Transaction[]> {

    ///assets/mock/transactions.json
    return this.http.get('/api/data')
    .pipe(map((res: any) => {
      this.transactions = res.data;
      this.observableTransactions.next(Object.assign([], this.transactions));
      return this.transactions;
    }));
  }

  addTransactions(transaction: Transaction): void {
    const currentValue = this.transactions;
    const updatedValue = [transaction, ...currentValue];
    this.observableTransactions.next(updatedValue);
  }
}
