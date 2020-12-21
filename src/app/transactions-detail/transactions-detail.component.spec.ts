import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TransactionsService } from '../transactions.service';
import { TransactionsDetailComponent } from './transactions-detail.component';
import { testData } from '../data.stub';
import { Transaction } from '../model//Transaction';
import { ConvertSpaceToDashPipe } from '../convert-space-to-dash.pipe';
import { CreditDebitIndicatorPipe } from '../credit-debit-indicator.pipe';

const transactionServiceStub = {
  get(): Transaction[] {
    return JSON.parse(JSON.stringify(testData));
  },
};

describe('TransactionsDetailComponent', () => {
  let component: TransactionsDetailComponent;
  let fixture: ComponentFixture<TransactionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionsDetailComponent,
        ConvertSpaceToDashPipe,
        CreditDebitIndicatorPipe,
      ],
      imports: [HttpClientModule],
      providers: [
        { provide: TransactionsService, useVaue: transactionServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle search', () => {
    const value = JSON.parse(JSON.stringify(testData.data));
    fixture.componentInstance.transactions = value;
    fixture.whenStable().then(() => {
      component.handleSearch('Backb');
      fixture.detectChanges();
      expect(component.transactionsDetails.length).toBe(1);
      expect(component.transactionsDetails[0].merchant.name).toEqual(
        'Backbase'
      );
    });
    fixture.detectChanges();
  });

  it('should handle sort by date ascending order', () => {
    const value = JSON.parse(JSON.stringify(testData.data));
    component.sortByDate = false;
    fixture.componentInstance.transactions = value;
    fixture.whenStable().then(() => {
      component.handleSort(1);
      fixture.detectChanges();
      expect(component.transactionsDetails.length).toBe(3);
      expect(component.transactionsDetails[0].merchant.name).toEqual(
        'The Tea Lounge'
      );
    });
    fixture.detectChanges();
  });
  it('should handle sort by date descending order', () => {
    const value = JSON.parse(JSON.stringify(testData.data));
    component.sortByDate = true;
    fixture.componentInstance.transactions = value;
    fixture.whenStable().then(() => {
      component.handleSort(1);
      fixture.detectChanges();
      expect(component.transactionsDetails.length).toBe(3);
      expect(component.transactionsDetails[0].merchant.name).toEqual(
        'The Tea Lounge'
      );
    });
    fixture.detectChanges();
  });

  it('should handle sort by Beneficiaries ascending order', () => {
    const value = JSON.parse(JSON.stringify(testData.data));
    component.sortByBeneficiaries = false;
    fixture.componentInstance.transactions = value;
    fixture.whenStable().then(() => {
      component.handleSort(2);
      fixture.detectChanges();
      expect(component.transactionsDetails.length).toBe(3);
      expect(component.transactionsDetails[0].merchant.name).toEqual(
        'Backbase'
      );
    });
    fixture.detectChanges();
  });

  it('should handle sort by Beneficiaries descending order', () => {
    const value = JSON.parse(JSON.stringify(testData.data));
    component.sortByBeneficiaries = true;
    fixture.componentInstance.transactions = value;
    fixture.whenStable().then(() => {
      component.handleSort(2);
      fixture.detectChanges();
      expect(component.transactionsDetails.length).toBe(3);
      expect(component.transactionsDetails[0].merchant.name).toEqual(
        'The Tea Lounge'
      );
    });
    fixture.detectChanges();
  });

  it('should handle sort by Amount ascending order', () => {
    const value = JSON.parse(JSON.stringify(testData.data));
    component.sortByAmount = false;
    fixture.componentInstance.transactions = value;
    fixture.whenStable().then(() => {
      component.handleSort(3);
      fixture.detectChanges();
      expect(component.transactionsDetails.length).toBe(3);
      expect(component.transactionsDetails[0].merchant.name).toEqual(
        'The Tea Lounge'
      );
    });
    fixture.detectChanges();
  });
  it('should handle sort by Amount descending order', () => {
    const value = JSON.parse(JSON.stringify(testData.data));
    component.sortByAmount = true;
    fixture.componentInstance.transactions = value;
    fixture.whenStable().then(() => {
      component.handleSort(3);
      fixture.detectChanges();
      expect(component.transactionsDetails.length).toBe(3);
      expect(component.transactionsDetails[0].merchant.name).toEqual(
        'Backbase'
      );
    });
    fixture.detectChanges();
  });
});
