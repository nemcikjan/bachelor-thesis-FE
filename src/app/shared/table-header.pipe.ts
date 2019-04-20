import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'tableHeader'
})
export class TableHeaderPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    return _.startCase(value);
  }
}
