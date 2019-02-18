import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../interfaces';

export const transformResponse = <T = any>() =>
  pipe(map((response: Response<T>) => response && response.data));
