import { CreditDebitIndicatorPipe } from './credit-debit-indicator.pipe';

describe('CreditDebitIndicatorPipe', () => {
  let pipe: CreditDebitIndicatorPipe;

  beforeEach(() => {
    pipe = new CreditDebitIndicatorPipe();
  });

  it('pipe transforms "DBIT" to "-value"', () => {
    expect(pipe.transform(54, 'DBIT')).toEqual(-54);
  });

  it('pipe transforms "CRDT" to "value"', () => {
    expect(pipe.transform(54, 'CRDT')).toEqual(54);
  });
});
