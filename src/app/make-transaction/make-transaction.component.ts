import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TransactionPreviewComponent } from '../transaction-preview/transaction-preview.component';
import { GlobalConstants } from '../common/global-constants';
import { ValidatorOneParam } from './validation';

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.css'],
})
export class MakeTransactionComponent implements OnInit {
  initialAmount = '5824.76';
  accountName: string;
  amount: string;
  errorMessage = '';
  formSubmitted = false;
  public addTransferFormGroup: FormGroup;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const regexPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this.addTransferFormGroup = new FormGroup({
      accountName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern(regexPattern),
        this.overdraftDifferenceValidator(this.initialAmount),
      ]),
    });
  }

  validationErrorExists(): boolean {
    return (
      (this.formSubmitted || this.addTransferFormGroup.dirty) &&
      !this.addTransferFormGroup.valid
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formSubmitted
      ? this.addTransferFormGroup.controls[controlName].hasError(errorName)
      : '';
  }

  showDialog(accountName, amount): void {
    const dialogRef = this.dialog.open(TransactionPreviewComponent, {
      width: '450px',
      height: '250px',
      data: {
        name: this.accountName,
        amount: this.amount,
      },
    });
    dialogRef.componentInstance.transferEvent.subscribe((result) => {
      this.reset();
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.reset();
    });
  }

  /**
   * preview
   * handle preview by opening dialog
   * @param event contain form event
   * @returns void
   */
  preview(event): void {
    this.formSubmitted = true;
    if (this.addTransferFormGroup.valid) {
      this.showDialog(this.accountName, this.amount);
      event.preventDefault();
    }
  }

  /**
   * reset
   * reset the form after transaction
   * @returns void
   */
  reset(): void {
    const diff = this.overdraftDifference();
    this.amount = '';
    this.accountName = '';
    this.initialAmount = diff.toString();
    this.formSubmitted = false;
  }

  /**
   * overdraftDifference
   * overdraftDifference of the initial value and teh amount
   * @returns float
   */
  overdraftDifference(): any {
    const diff = parseFloat(this.initialAmount) - parseFloat(this.amount);
    return diff.toFixed(2);
  }

  /**
   * overdraftDifferenceValidator
   * custom validator for overdraftDifference
   * @returns validationError
   */
  overdraftDifferenceValidator(initialAmount: string): ValidatorOneParam {
    return (control: AbstractControl): ValidationErrors | null => {
      const amount = control.value;
      const diff = parseFloat(initialAmount) - parseFloat(amount);
      if (Number(diff.toFixed(2)) < -GlobalConstants.overdraft) {
        return { overdraftDifferenceValidator: true };
      }
      return null;
    };
  }
}
