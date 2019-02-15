import { State } from '@ngxs/store';
import { AppStateModel } from './app.model';

@State<AppStateModel>({
  name: 'app'
})
export class AppState {}
