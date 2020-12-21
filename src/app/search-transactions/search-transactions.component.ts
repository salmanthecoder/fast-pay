import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { filters } from '../transactions-detail/transactions-detail.component';

@Component({
  selector: 'app-search-transactions',
  templateUrl: './search-transactions.component.html',
  styleUrls: ['./search-transactions.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchTransactionsComponent implements OnInit {
  @ViewChild('amount', { static: true })
  private amount: ElementRef;
  @ViewChild('beneficiaries', { static: true })
  private beneficiaries: ElementRef;
  @ViewChild('date', { static: true })
  private date: ElementRef;

  @Output() searchEvent = new EventEmitter();
  @Output() filterEvent = new EventEmitter();

  public sortByDate = true;
  public sortByBeneficiaries = true;
  public sortByAmount = true;
  public keyUpSubject = new Subject<string>();

  constructor() {}

  ngOnInit(): void {
    const onKeyUpEvent = this.keyUpSubject
      .pipe(debounceTime(250))
      .subscribe((value) => {
        this.searchEvent.emit(value);
      });

    this.handleSort(1);
  }
  /**
   * filter
   * handle filters
   * @param val contain value to filter
   * @returns void
   */
  filter(val): void {
    this.handleSort(val);
    this.filterEvent.emit(val);
  }
  /**
   * removeClass
   * removes class on sorting
   * @returns void
   */
  removeClass(): void {
    this.amount.nativeElement.className = '';
    this.date.nativeElement.className = '';
    this.beneficiaries.nativeElement.className = '';
  }

  /**
   * handleSort
   * handle sorting and adding class icons
   * @returns void
   */
  handleSort(type): void {
    this.removeClass();
    switch (type) {
      case filters.date:
        this.sortByDate = !this.sortByDate;
        this.date.nativeElement.className =
          (this.sortByDate ? 'up' : 'down') + ' active';
        break;
      case filters.beneficiaries:
        this.sortByBeneficiaries = !this.sortByBeneficiaries;
        this.beneficiaries.nativeElement.className =
          (this.sortByBeneficiaries ? 'up' : 'down') + ' active';
        break;
      case filters.amount:
        this.sortByAmount = !this.sortByAmount;
        this.amount.nativeElement.className =
          (this.sortByAmount ? 'up' : 'down') + ' active';
        break;
    }
  }
}
