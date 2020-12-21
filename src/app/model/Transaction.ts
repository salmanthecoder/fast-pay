export interface Transaction {
  categoryCode: string;
  transaction: TransactionData;
  merchant: Merchant;
  dates: Dates;
}

interface TransactionData {
  amountCurrency: AmountCurrency;
  creditDebitIndicator: string;
  type: string;
}

interface Dates {
  valueDate: any;
}
interface AmountCurrency {
  amount: number;
  currencyCode: string;
}
interface Merchant {
  name: string;
  accountNumber: string;
}
