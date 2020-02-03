import { Action, State, StateContext } from '@ngxs/store';
import { ChangeShortcut, ResetShortcuts } from './shortcuts.actions';

export interface ShortcutsModel {
  SPEED_UP: string;
  SPEED_DOWN: string;
  SPEED_RESET: string;
  QUALITY_UP: string;
  QUALITY_DOWN: string;
}

type Context = StateContext<ShortcutsModel>;

const DEFAULTS: ShortcutsModel =  {
  SPEED_UP: 'NumpadAdd',
  SPEED_DOWN: 'NumpadSubtract',
  SPEED_RESET: 'NumpadMultiply',
  QUALITY_UP: 'Shift + NumpadAdd',
  QUALITY_DOWN: 'Shift + NumpadSubtract',
};

@State<ShortcutsModel>({
  name: 'shortcuts',
  defaults: DEFAULTS,
})
export class ShortcutsState {
  @Action(ChangeShortcut)
  changeShortcut(ctx: Context, { key, shortcut }: ChangeShortcut) {
    ctx.patchState({ [key]: shortcut });
  }

  @Action(ResetShortcuts)
  reset(ctx: Context) {
    ctx.setState(DEFAULTS);
  }
}
