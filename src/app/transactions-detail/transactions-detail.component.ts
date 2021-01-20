import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../model/Transaction';

export enum filters {
  date = 1,
  beneficiaries = 2,
  amount = 3,
}
@Component({
  selector: 'app-transactions-detail',
  templateUrl: './transactions-detail.component.html',
  styleUrls: ['./transactions-detail.component.css'],
})
export class TransactionsDetailComponent implements OnInit {
  public sortByDate = true;
  public sortByBeneficiaries = true;
  public sortByAmount = true;
  public transactionsDetails;
  private transactionsBackup;

  @Input('transactions')
  set transactions(value: Transaction[]) {
    this.transactionsDetails = this.transactionsBackup = value;
    if (this.transactionsDetails && this.transactionsDetails.length !== 0) {
      this.sortByDate = true;
      this.handleSortDate();
    }
  }
  constructor() {}

  ngOnInit(): void {}

  /**
   * handleSearch
   * handle search
   * @param term contain value to search on details
   * @returns void
   */
  handleSearch(term): void {
    this.transactionsDetails = this.transactionsBackup;
    if (term.length === 0) {
      return;
    }
    this.transactionsDetails = this.transactionsDetails.filter(
      (obj) =>
        obj.merchant.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
    );
  }
  /**
   * handleSort
   * handle sort type
   * @param type contain value to sort on
   * @returns void
   */
  handleSort(type): void {
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
  /**
   * handleSortDate
   * handle sort date
   * @returns void
   */
  handleSortDate(): void {
    this.sortByDate = !this.sortByDate;
    this.transactionsDetails = this.transactionsDetails.sort(
      (logA: Transaction, logB: Transaction) => {
        const dateA = new Date(logA.dates.valueDate).getTime();
        const dateB = new Date(logB.dates.valueDate).getTime();
        // this.sortByDate => false is desecnding
        if (this.sortByDate) {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }
    );
  }
  /**
   * handleSortBeneficiaries
   * handle sort beneficiaries
   * @returns void
   */
  handleSortBeneficiaries(): void {
    this.sortByBeneficiaries = !this.sortByBeneficiaries;
    this.transactionsDetails = this.transactionsDetails.sort(
      (a: Transaction, b: Transaction) => {
        // this.sortByBeneficiaries => false is desecnding
        if (this.sortByBeneficiaries) {
          return a.merchant.name.localeCompare(b.merchant.name);
        } else {
          return b.merchant.name.localeCompare(a.merchant.name);
        }
      }
    );
  }

  /**
   * handleSortAmount
   * handle sort amount
   * @returns void
   */
  handleSortAmount(): void {
    this.sortByAmount = !this.sortByAmount;
    this.transactionsDetails = this.transactionsDetails.sort((a, b) => {
      const amountA = (a.transaction.amountCurrency.amount);
      const amountB = (b.transaction.amountCurrency.amount);
      // this.sortByAmount => false is desecnding
      if (this.sortByAmount) {
        return amountA - amountB;
      } else {
        return amountB - amountA;
      }
    });
  }
}
