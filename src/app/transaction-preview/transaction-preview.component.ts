import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Transaction} from "../model/Transaction";
import {TransactionsService} from "../transactions.service";



@Component({
  selector: 'app-transaction-preview',
  templateUrl: './transaction-preview.component.html',
  styleUrls: ['./transaction-preview.component.css'],
})
export class TransactionPreviewComponent implements OnInit {
  name: string;
  amount: number;
  transaction: Transaction;
  constructor(public dialogRef: MatDialogRef<TransactionPreviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private transactionsService: TransactionsService) { }
  @Output() onTransfer = new EventEmitter();

  ngOnInit(): void {
    this.name = this.data?.name;
    this.amount = this.data?.amount;
    this.dialogRef.disableClose = false
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  transfer(event) {
    let currentTransaction = {
      categoryCode: "#12a580",
    dates: {
      "valueDate": new Date()
    },
    transaction: {
      amountCurrency: {
        amount: this.amount,
        currencyCode: "USD"
      },
      type: "Online Transfer",
      creditDebitIndicator: "DBIT"
    },
    merchant: {
      name: this.name,
      accountNumber: ""
    }
  };
  this.onTransfer.emit(null);
  this.dialogRef.close();
  this.transactionsService.addTransactions(currentTransaction);
  }
}
