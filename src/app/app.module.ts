import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import '@angular/localize/init';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MakeTransactionComponent } from './make-transaction/make-transaction.component';
import { SearchTransactionsComponent } from './search-transactions/search-transactions.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { TransactionsDetailComponent } from './transactions-detail/transactions-detail.component';
import { TransactionPreviewComponent } from './transaction-preview/transaction-preview.component';
import { TransactionsService } from './transactions.service';
import { CreditDebitIndicatorPipe } from './credit-debit-indicator.pipe';
import { ConvertSpaceToDashPipe } from './convert-space-to-dash.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MakeTransactionComponent,
    SearchTransactionsComponent,
    TransactionsHistoryComponent,
    TransactionsDetailComponent,
    TransactionPreviewComponent,
    CreditDebitIndicatorPipe,
    ConvertSpaceToDashPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true },
    },
    TransactionsService,
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
