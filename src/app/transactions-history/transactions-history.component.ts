import { Component, OnInit } from '@angular/core';
import {Transaction} from "../model/Transaction";
import {Observable} from "rxjs";
import { of } from 'rxjs';
import {TransactionsService} from "../transactions.service";

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css']
})
export class TransactionsHistoryComponent implements OnInit {

  public transactions: Observable<Transaction[]>;
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.observableTransactions.subscribe(value => {
      this.transactions = of(value);
    });
    this.transactions = this.transactionsService.getTransactions();
  }
}
