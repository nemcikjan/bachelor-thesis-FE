import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Login, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth'
})
export class AuthState {
  @Selector()
  static token$(state: AuthStateModel) {
    return state.token;
  }

  constructor() {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { payload }: Login) {
    const { token, user } = payload;
    return patchState({ token, user });
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>) {
    return setState({});
  }
}
