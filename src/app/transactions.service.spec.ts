import { TestBed, async, inject  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TransactionsService
      ],
    });

    service = TestBed.get(TransactionsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch data as an Observable`, async(inject([HttpTestingController, TransactionsService],
    (httpClient: HttpTestingController, treeService: TransactionsService) => {

      const testData = {
        data: [{
            categoryCode: '#12a580',
            dates: {
              valueDate: 1600493600000
            },
            transaction: {
              amountCurrency: {
                amount: 5000,
                currencyCode: 'EUR'
              },
              type: 'Salaries',
              creditDebitIndicator: 'CRDT'
            },
            merchant: {
              name: 'Backbase',
              accountNumber: 'SI64397745065188826'
            }
          }
    ]
    };
      treeService.get()
        .subscribe((data: any) => {
          expect(data.length).toBe(1);
        });
      const req = httpMock.expectOne('/api/data');
      expect(req.request.method).toBe('GET');
      req.flush(testData);
      httpMock.verify();
    })));

  it(`should add data via behaviour subject`, async(inject([HttpTestingController, TransactionsService],
      (httpClient: HttpTestingController, treeService: TransactionsService) => {

        const testData = {
          data: [{
              categoryCode: '#12a580',
              dates: {
                valueDate: 1600493600000
              },
              transaction: {
                amountCurrency: {
                  amount: 5000,
                  currencyCode: 'EUR'
                },
                type: 'Salaries',
                creditDebitIndicator: 'CRDT'
              },
              merchant: {
                name: 'Backbase',
                accountNumber: 'SI64397745065188826'
              }
            }
      ]
      };
        treeService.get()
          .subscribe((data: any) => {
            expect(data.length).toBe(1);
            expect(data[0].merchant.name).toEqual('Backbase');
          });
        const req = httpMock.expectOne('/api/data');
        expect(req.request.method).toBe('GET');
        req.flush(testData);
        httpMock.verify();

        const testDatatoAdd = {
              categoryCode: '#12a580',
              dates: {
                valueDate: 1600493600000
              },
              transaction: {
                amountCurrency: {
                  amount: 2000,
                  currencyCode: 'USD'
                },
                type: 'Salaries',
                creditDebitIndicator: 'CRDT'
              },
              merchant: {
                name: 'TestData',
                accountNumber: 'SI64397745065188829'
              }
            };
        treeService.addTransactions(testDatatoAdd);
        treeService.observableTransactions
          .subscribe((data: any) => {
            expect(data.length).toBe(2);
            expect(data[0].merchant.name).toEqual('TestData');
            expect(data[1].merchant.name).toEqual('Backbase');
          });

      })));
});
