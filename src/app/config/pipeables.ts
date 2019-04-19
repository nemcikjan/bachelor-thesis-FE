import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../interfaces';
import { filterEmptyObject } from './helper-function';

export const transformResponse = <T = any>() =>
  pipe(
    map((response: Response<T>) => response && response.data),
    map(transformed => transformed.filter(filterEmptyObject))
  );
