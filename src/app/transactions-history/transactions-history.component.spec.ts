import {
  inject,
  tick,
  TestBed,
  getTestBed,
  async,
  fakeAsync,
  ComponentFixture,
} from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TransactionsService } from '../transactions.service';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { DataStub, testData } from '../data.stub';
describe('TransactionsHistoryComponent', () => {
  let component: TransactionsHistoryComponent;
  let fixture: ComponentFixture<TransactionsHistoryComponent>;
  let dataStub: DataStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsHistoryComponent],
      imports: [HttpClientModule],
      providers: [{ provide: TransactionsService }],
    }).compileComponents();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsHistoryComponent],
    })
      .overrideComponent(TransactionsHistoryComponent, {
        set: {
          providers: [{ provide: TransactionsService, useClass: DataStub }],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TransactionsHistoryComponent);
        component = fixture.componentInstance;
        dataStub = fixture.debugElement.injector.get(TransactionsService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve test data', fakeAsync(() => {
    const spy = spyOn(dataStub, 'get').and.returnValue(
      Observable.create((observer) => {
        observer.next(testData);
        observer.complete();
      })
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
  }));
});
