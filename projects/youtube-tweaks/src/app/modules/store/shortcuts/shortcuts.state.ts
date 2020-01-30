import { State } from '@ngxs/store';

export interface ShortcutsModel {
  SPEED_UP: string;
  SPEED_DOWN: string;
  QUALITY_UP: string;
  QUALITY_DOWN: string;
}

@State<ShortcutsModel>({
  name: 'shortcuts',
  defaults: {
    SPEED_UP: 'NumpadAdd',
    SPEED_DOWN: 'NumpadSubtract',
    QUALITY_UP: 'Shift + NumpadAdd',
    QUALITY_DOWN: 'Shift + NumpadSubtract'
  },
})
export class ShortcutsState {

}
