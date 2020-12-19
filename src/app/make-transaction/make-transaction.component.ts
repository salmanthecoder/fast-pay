import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionPreviewComponent } from '../transaction-preview/transaction-preview.component';

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {

  initialAmount:string='5824.76'
  accountName: string;
  amount: string; 
  errorMessage: string ='';
  hasError: boolean =false;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showDialog(accountName, amount) {
    const dialogRef = this.dialog.open(TransactionPreviewComponent, {
      width: '450px',
      height: '250px',
      data: {
        name: this.accountName,
        amount: this.amount,
      },
    });
    dialogRef.componentInstance.onTransfer.subscribe(result => {
      this.reset();
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.reset();
    });
  }

  preview(event) {
    this.errorMessage = this.getErrorMessage();
    if(this.errorMessage !== '') {
      this.hasError= true;
      return false; 
    }
      this.hasError= false;
      this.showDialog(this.accountName, this.amount);
      event.preventDefault();
      
  }

  getErrorMessage() {
    let message = '';
    if(!this.amount && !this.accountName) {
      return message = $localize`Please enter "To Account" and "Amount"`;
    }
    if(!this.accountName) {
      return message = $localize`Please enter "To Account"`;
    }
    if(!this.amount) {
      return message = $localize`Please enter "Amount"`;
    }
    const numberValue = parseFloat(this.amount).toFixed(2);

    if(numberValue === 'NaN')
    {
      return message = $localize`Please enter valid "Amount"`;
    }
    const overDraftDifference = this.overdraftDifference();
    if(parseInt(overDraftDifference) < -499)
    {
      return message = $localize`Overdraft amount cannot be more then 500`;
    }
    return '';
  }

  reset() {
    let diff = this.overdraftDifference();
    this.amount ='';
    this.accountName= '';
    this.initialAmount  = diff.toString();
  }

  overdraftDifference() {
    let diff = parseFloat(this.initialAmount) - parseFloat(this.amount);
    return diff.toFixed(2);
  }


}
