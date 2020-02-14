import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { ToggleButtonInsert, ToggleStopBlocked, ToggleSuspend } from './preferences.actions';

export interface PreferencesStateModel {
  suspend: boolean;
  insertButtons: boolean;
  stopBlocked: boolean;
}

type Context = StateContext<PreferencesStateModel>;

const PREFERENCES_STATE_TOKEN = new StateToken<PreferencesStateModel>('preferences');

@State<PreferencesStateModel>({
  name: PREFERENCES_STATE_TOKEN,
  defaults: {
    suspend: false,
    insertButtons: true,
    stopBlocked: false,
  }
})
export class PreferencesState {
  @Action(ToggleButtonInsert)
  toggleButtonInsert(ctx: Context) {
    const { insertButtons } = ctx.getState();

    ctx.patchState({ insertButtons: !insertButtons });
  }

  @Action(ToggleSuspend)
  toggleSuspend(ctx: Context) {
    const { suspend } = ctx.getState();

    ctx.patchState({ suspend: !suspend });
  }

  @Action(ToggleStopBlocked)
  toggleStopBlocked(ctx: Context) {
    const { stopBlocked } = ctx.getState();

    ctx.patchState({ stopBlocked: !stopBlocked });
  }
}
