import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../model/Transaction';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-preview',
  templateUrl: './transaction-preview.component.html',
  styleUrls: ['./transaction-preview.component.css'],
})
export class TransactionPreviewComponent implements OnInit {
  name: string;
  amount: number;
  transaction: Transaction;
  constructor(
    public dialogRef: MatDialogRef<TransactionPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionsService: TransactionsService
  ) {}
  @Output() transferEvent = new EventEmitter();

  ngOnInit(): void {
    this.name = this.data?.name;
    this.amount = this.data?.amount;
    this.dialogRef.disableClose = false;
  }

  /**
   * onNoClick
   * handle dialog closing
   * @returns void
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /**
   * transfer
   * handle transfer and preview
   * @returns void
   */
  transfer(event): void {
    const currentTransaction = {
      categoryCode: '#12a580',
      dates: {
        valueDate: new Date(),
      },
      transaction: {
        amountCurrency: {
          amount: this.amount,
          currencyCode: 'USD',
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: this.name,
        accountNumber: '',
      },
    };
    this.transferEvent.emit(null);
    this.dialogRef.close();
    // add this transaction on clicking of transfer button on preview dialog
    this.transactionsService.addTransactions(currentTransaction);
  }
}
