import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs'
import { debounceTime, } from 'rxjs/operators';
import { filters } from '../transactions-detail/transactions-detail.component';

@Component({
  selector: 'app-search-transactions',
  templateUrl: './search-transactions.component.html',
  styleUrls: ['./search-transactions.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchTransactionsComponent implements OnInit {

  @ViewChild('amount', {static: true})
  private amount: ElementRef;
  @ViewChild('beneficiaries', {static: true})
  private beneficiaries: ElementRef;
  @ViewChild('date', {static: true})
  private date: ElementRef;

  @Output() onSearch = new EventEmitter();
  @Output() onFilter = new EventEmitter();

  public sortByDate = true;
  public sortByBeneficiaries = false;
  public sortByAmount = false;
  public keyUpSubject = new Subject<string>();

  constructor() {
  }

  ngOnInit() {
    const onKeyUpEvent = this.keyUpSubject.pipe(
      debounceTime(250))
      .subscribe((value) => {
        this.onSearch.emit(value);
      });

    this.handleSort(1);
  }

  filter(val) {
    this.handleSort(val);
    this.onFilter.emit(val);
  }

  removeClass() {
    this.amount.nativeElement.className = '';
    this.date.nativeElement.className = '';
    this.beneficiaries.nativeElement.className = '';
  }

  handleSort(type) {
    this.removeClass();
    switch (type) {
      case filters.date:
        this.sortByDate = !this.sortByDate;
        this.date.nativeElement.className = (this.sortByDate ? 'up' : 'down') + ' active';
        break;
      case filters.beneficiaries:
        this.sortByBeneficiaries = !this.sortByBeneficiaries;
        this.beneficiaries.nativeElement.className = (this.sortByBeneficiaries ? 'up' : 'down') + ' active';
        break;
      case filters.amount:
        this.sortByAmount = !this.sortByAmount;
        this.amount.nativeElement.className = (this.sortByAmount ? 'up' : 'down') + ' active';
        break;
    }
  }

}
