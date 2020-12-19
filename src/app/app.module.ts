import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchTransactionsComponent } from './search-transactions/search-transactions.component';
import { TransactionPreviewComponent } from './transaction-preview/transaction-preview.component';
import { TransactionsDetailComponent } from './transactions-detail/transactions-detail.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { MakeTransactionComponent } from './make-transaction/make-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchTransactionsComponent,
    TransactionPreviewComponent,
    TransactionsDetailComponent,
    TransactionsHistoryComponent,
    MakeTransactionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
