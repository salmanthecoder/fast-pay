import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditdebitindicator'
})
export class CreditDebitIndicatorPipe implements PipeTransform {

  transform(value: any, indicator: string): any {
    return indicator && indicator === 'DBIT' ? -value : value;
  }

}
