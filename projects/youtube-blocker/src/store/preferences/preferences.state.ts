import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { ToggleButtonInsert, ToggleSuspend } from './preferences.actions';

export interface PreferencesStateModel {
  suspend: boolean;
  insertButtons: boolean;
}

const PREFERENCES_STATE_TOKEN = new StateToken<PreferencesStateModel>('preferences');

@State<PreferencesStateModel>({
  name: PREFERENCES_STATE_TOKEN,
  defaults: {
    suspend: false,
    insertButtons: true,
  }
})
export class PreferencesState {
  @Action(ToggleButtonInsert)
  toggleButtonInsert(ctx: StateContext<PreferencesStateModel>) {
    const { insertButtons } = ctx.getState();

    ctx.patchState({ insertButtons: !insertButtons });
  }

  @Action(ToggleSuspend)
  toggleSuspend(ctx: StateContext<PreferencesStateModel>) {
    const { suspend } = ctx.getState();

    ctx.patchState({ suspend: !suspend });
  }
}
