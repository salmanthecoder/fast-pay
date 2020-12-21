import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTransactionsComponent } from './search-transactions.component';

describe('SearchTransactionsComponent', () => {
  let component: SearchTransactionsComponent;
  let fixture: ComponentFixture<SearchTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTransactionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on filter', () => {
    spyOn(component.filterEvent, 'emit');
    component.filter(1);
    fixture.detectChanges();
    expect(component.filterEvent.emit).toHaveBeenCalled();
    expect(component.filterEvent.emit).toHaveBeenCalledWith(1);
  });

  it('should call handle sort', () => {
    spyOn(component, 'handleSort');
    component.filter(2);
    fixture.detectChanges();
    expect(component.handleSort).toHaveBeenCalled();
    expect(component.handleSort).toHaveBeenCalledWith(2);
  });
  it('should call handle by date', () => {
    component.sortByDate = true;
    component.handleSort(1);
    fixture.detectChanges();
    expect(component.sortByDate).toBe(false);
  });
  it('should call handle sort by beneficiaries', () => {
    component.sortByBeneficiaries = true;
    component.handleSort(2);
    fixture.detectChanges();
    expect(component.sortByBeneficiaries).toBe(false);
  });
  it('should call handle sort by amount', () => {
    component.sortByBeneficiaries = true;
    component.handleSort(3);
    fixture.detectChanges();
    expect(component.sortByAmount).toBe(false);
  });
});
