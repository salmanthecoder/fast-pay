import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TransactionPreviewComponent } from './transaction-preview.component';
import { TransactionsService } from '../transactions.service';
describe('TransactionPreviewComponent', () => {
  let component: TransactionPreviewComponent;
  let fixture: ComponentFixture<TransactionPreviewComponent>;
  const dialogMock = {
    data: { accountName: 'A', amount: '500' },
    onNoClick: () => {},
    transfer: () => {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionPreviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule],
      providers: [
        { provide: HttpClient },
        { provide: TransactionsService },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogMock },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPreviewComponent);
    component = fixture.componentInstance;
    component.data = { accountName: 'A', amount: '500' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct h2 title in dialog', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toEqual('Transfer Money');
  });

  it('should display correct decription in dialog amount', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector(
        'mat-dialog-content > mat-form-field > div:nth-child(3) > mat-label'
      ).textContent
    ).toEqual('Amount: $ 500');
  });

  it('should call function on clicking of transfer', () => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'transfer');
    const el = compiled.querySelector(' mat-dialog-actions > button').click();
    expect(component.transfer).toHaveBeenCalled();
  });

  it('should emit event on clicking of transfer', () => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component.transferEvent, 'emit');
    // trigger the click
    const nativeElement = fixture.nativeElement;
    const button = compiled.querySelector(' mat-dialog-actions > button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.transferEvent.emit).toHaveBeenCalled();
  });
});
