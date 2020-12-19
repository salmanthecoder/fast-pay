import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removewhitespace'
})
export class RemoveWhiteSpacePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace(/ /g, '-');
  }

}
