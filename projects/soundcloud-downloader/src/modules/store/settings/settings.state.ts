import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToggleTrackNumber } from './settings.actions';

export interface SettingsModel {
  addTrackNumberToFileName: boolean;
}

type Context = StateContext<SettingsModel>

@State<SettingsModel>({
  name: 'settings',
  defaults: {
    addTrackNumberToFileName: false,
  },
})
export class SettingsState {
  @Action(ToggleTrackNumber)
  toggleTrackNumber(ctx: Context, { status }: ToggleTrackNumber) {
    ctx.patchState({ addTrackNumberToFileName: status });
  }

  @Selector()
  static addTrackNumberToFileName(state: SettingsModel) {
    return state.addTrackNumberToFileName;
  }
}
