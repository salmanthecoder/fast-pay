import { Component, LOCALE_ID, Inject  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-transactions';
  languageList = [
    { code: 'en-US', label: 'EN' },
    { code: 'nl', label: 'NL' },
  ];
  constructor(@Inject(LOCALE_ID) protected localeId: string) {}
}
