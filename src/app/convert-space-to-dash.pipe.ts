import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertspacetodash'
})
export class ConvertSpaceToDashPipe implements PipeTransform {

  transform(value: string, args?: string): string {
    return value.replace(/ /g, '-');
  }

}
