import { Action, State, StateContext } from '@ngxs/store';
import { SetDefaultQuality, SetDefaultSpeed, ToggleAutoStart, ToggleShortcuts } from './preferences.actions';

export interface PreferencesModel {
  defaultSpeed: number;
  defaultQuality: string;
  autoStart: boolean;
  shortcutsEnabled: boolean;
}

type Context = StateContext<PreferencesModel>;

@State<PreferencesModel>({
  name: 'preferences',
  defaults: {
    defaultSpeed: 1,
    defaultQuality: 'auto',
    autoStart: true,
    shortcutsEnabled: true,
  },
})
export class PreferencesState {
  @Action(ToggleShortcuts)
  toggleShortcuts(ctx: Context) {
    const { shortcutsEnabled } = ctx.getState();

    ctx.patchState({ shortcutsEnabled: !shortcutsEnabled });
  }

  @Action(ToggleAutoStart)
  toggleAutoStart(ctx: Context) {
    const { autoStart } = ctx.getState();

    ctx.patchState({ autoStart: !autoStart });
  }

  @Action(SetDefaultSpeed)
  setDefaultSpeed(ctx: Context, { speed }: SetDefaultSpeed) {
    ctx.patchState({ defaultSpeed: speed });
  }

  @Action(SetDefaultQuality)
  setDefaultQuality(ctx: Context, { quality }: SetDefaultQuality) {
    ctx.patchState({ defaultQuality: quality });
  }
}
