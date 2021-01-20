import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditdebitindicator'
})
export class CreditDebitIndicatorPipe implements PipeTransform {

  transform(value: number, indicator: string): any {
    return indicator && indicator === 'DBIT' ? -value : value;
  }

}
