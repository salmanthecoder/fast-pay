import {  Observable, of, Subject} from 'rxjs';
import { Transaction } from 'src/app/model/Transaction';
export const testData = {
  data: [{
      categoryCode: '#12a580',
      dates: {
        valueDate: '2020-09-23'
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
    },
    {
      categoryCode: '#12a580',
      dates: {
        valueDate: '2020-09-05'
      },
      transaction: {
        amountCurrency: {
          amount: '82.02',
          currencyCode: 'EUR'
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: 'The Tea Lounge',
        accountNumber: 'SI64397745065188826'
      }
    }, {
      categoryCode: '#d51271',
      dates: {
        valueDate: '2020-09-21'
      },
      transaction: {
        amountCurrency: {
          amount: '84.64',
          currencyCode: 'EUR'
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: 'Texaco',
        accountNumber: 'SI64397745065188826'
      }
    }
]
};

export class DataStub {
  public observableTransactions: Subject<Transaction[]>;
  constructor() {
    this.observableTransactions = new Subject<Transaction[]>();
   }

  public get(): Observable<Transaction[]> {
    return Observable.create( observer => {
        observer.next(testData);
        observer.complete();
    });
  }
}
