import { Pipe } from '@angular/core';

@Pipe({
  // tslint:disable-next-line
  name: 'truncate',
})
export class JbTruncatePipe {
  /**
   * Truncates input string with &hellip; to the specified length
   * @param input Input string
   * @param maxLength max length
   * @param useWordBoundary if true truncation will shift to the nearest word
   * @param terminationString Default &hellip; ('…')
   */
  transform(
    value: string,
    maxLength = 25,
    useWordBoundary = true,
    terminationString = '…'
  ): string {
    if (!value || value.length === 0 || value.length <= maxLength) {
      return value;
    }
    let output = value.substr(0, maxLength - 1 - terminationString.length);
    if (useWordBoundary) {
      output = output.substr(0, output.lastIndexOf(' '));
    }
    return output + terminationString;
  }
}
