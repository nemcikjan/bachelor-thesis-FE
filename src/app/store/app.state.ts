import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AppStateModel } from './app.model';
import { PatchData, SetData } from './app.actions';
import * as _ from 'lodash';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    data: []
  }
})
export class AppState {
  @Selector()
  static getById$(state: AppStateModel) {
    return (id: string) => state.data.find(d => d.nodeId === id);
  }

  @Selector()
  static data$(state: AppStateModel) {
    return state.data;
  }

  @Action(PatchData)
  patchData(
    { setState, getState }: StateContext<AppStateModel>,
    { payload }: PatchData
  ) {
    const { nodeId, ...rest } = payload;
    const state = getState().data;
    const updated = _.chain(state)
      .find({ nodeId: nodeId })
      .merge({ ...rest }) as any;
    return setState(updated);
  }

  @Action(SetData)
  setData({ setState }: StateContext<AppStateModel>, { payload }: SetData) {
    return setState({ data: payload });
  }
}
