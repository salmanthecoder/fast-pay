import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MakeTransactionComponent } from './make-transaction.component';

describe('MakeTransactionComponent', () => {
  let component: MakeTransactionComponent;
  let fixture: ComponentFixture<MakeTransactionComponent>;
  const initialAmount = '5824.76';
  const dialogMock = {
    data: { accountName: 'A', amount: '500' },
    onNoClick: () => {},
    transfer: () => {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeTransactionComponent],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call preview', () => {
    spyOn(component, 'showDialog');
    component.amount = '50';
    component.accountName = 'test';
    const event = new Event('new event');
    fixture.whenStable().then(() => {
      component.preview(event);
      fixture.detectChanges();
      expect(component.showDialog).toHaveBeenCalled();
      expect(component.showDialog).toHaveBeenCalledWith('test', '50');
    });
  });

  it('should call reset', () => {
    component.amount = '50';
    component.accountName = 'test';
    component.reset();
    fixture.detectChanges();
    expect(component.accountName).toBe('');
  });

  it('should call overdraftDifference', () => {
    component.amount = '50';
    component.accountName = 'test';
    const overdraftDifference = component.overdraftDifference();
    fixture.detectChanges();
    expect(overdraftDifference).toBe(5774.76);
  });

  it('should get error if amount is not filled', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.amount = '';
    component.accountName = 'test';
    const event = new Event('new event');
    component.preview(event);
    fixture.detectChanges();
    expect(
      compiled.querySelector('form > div > div:nth-child(2)').textContent
    ).toEqual('Please enter "Amount"');
  });

  it('should get error if accountName is not filled', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.amount = '50';
    component.accountName = '';
    const event = new Event('new event');
    component.preview(event);
    fixture.detectChanges();
    expect(
      compiled.querySelector('form > div > div:nth-child(1)').textContent
    ).toEqual('Please enter "To Account"');
  });

  it('should get error if accountName and amount is not filled', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.amount = '';
    component.accountName = '';
    const event = new Event('new event');
    component.preview(event);
    fixture.detectChanges();
    expect(
      compiled.querySelector('form > div > div:nth-child(1)').textContent
    ).toEqual('Please enter "To Account"');
  });
});
