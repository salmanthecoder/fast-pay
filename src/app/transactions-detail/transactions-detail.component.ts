import { Component, Input, OnInit } from '@angular/core';
import {TransactionsService} from "../transactions.service";
import {Transaction} from "../model/Transaction";

export enum filters {
  date = 1 ,
  beneficiaries = 2,
  amount = 3
}
@Component({
  selector: 'app-transactions-detail',
  templateUrl: './transactions-detail.component.html',
  styleUrls: ['./transactions-detail.component.scss'],
})
export class TransactionsDetailComponent implements OnInit {

  public sortByDate = false;
  public sortByBeneficiaries = false;
  public sortByAmount = false;
  public transactionsDetails;
  private transactionsBackup;

  @Input('transactions')
  set transactions(value: Transaction[]) {
    this.transactionsDetails = this.transactionsBackup = value;
    if(this.transactionsDetails && this.transactionsDetails.length !== 0) {
      this.sortByDate = false;
      this.handleSortDate();
    }
    
  }
  constructor(private _transService: TransactionsService) {
  }

  ngOnInit() {
    
  }

  handleSearch(term) {
    this.transactionsDetails = this.transactionsBackup;
    if (term.length === 0) {
      return;
    }
    this.transactionsDetails = this.transactionsDetails.filter(obj => obj.merchant.name.toLowerCase().indexOf(term.toLowerCase()) !== -1);
  }

  handleSort(type) {
    switch (type) {
      case filters.date:
        this.handleSortDate();
        break;
      case filters.beneficiaries:
        this.handleSortBeneficiaries();
        break;
      case filters.amount:
        this.handleSortAmount();
        break;
    }
  }

  handleSortDate() {
    this.sortByDate = !this.sortByDate;
    this.transactionsDetails = this.transactionsDetails.sort((logA: Transaction, logB: Transaction) => {
      const dateA =  new Date(logA.dates.valueDate).getTime();  
      const dateB =  new Date(logB.dates.valueDate).getTime();
      if (this.sortByDate) {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }

  handleSortBeneficiaries() {
    this.sortByBeneficiaries = !this.sortByBeneficiaries;
    this.transactionsDetails = this.transactionsDetails.sort((a: Transaction, b: Transaction) => {
      if (this.sortByBeneficiaries) {
        return a.merchant.name.localeCompare(b.merchant.name);
      } else {
        return b.merchant.name.localeCompare(a.merchant.name);
      }
    });
  }

  handleSortAmount() {
    this.sortByAmount = !this.sortByAmount;
    this.transactionsDetails = this.transactionsDetails.sort((a, b) => {
      const amountA = parseFloat(a.transaction.amountCurrency.amount);
      const amountB = parseFloat(b.transaction.amountCurrency.amount);
      if (this.sortByAmount) {
        return amountA - amountB;
      } else {
        return amountB - amountA;
      }
    });
  }
}
