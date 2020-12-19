import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TransactionsService} from "../transactions.service";
import {Transaction} from "../model/Transaction";

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css']
})
export class TransactionsHistoryComponent implements OnInit {

  public transactions: Observable<Transaction[]>;
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactions = this.transactionsService.get();
    console.log(this.transactions);
  }

}
