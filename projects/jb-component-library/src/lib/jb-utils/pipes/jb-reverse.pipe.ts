import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // tslint:disable-next-line
  name: 'reverse',
  pure: false,
})
export class JbReversePipe implements PipeTransform {
  transform(values: any[]): any[] {
    if (values) {
      return values.slice().reverse();
    }
    return [];
  }
}
