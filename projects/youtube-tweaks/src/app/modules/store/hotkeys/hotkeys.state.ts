import { State } from '@ngxs/store';

export interface HotkeysModel {
  [command: string]: string;
}

@State<HotkeysModel>({
  name: 'hotkeys',
  defaults: {
    SPEED_UP: '+',
    SPEED_DOWN: '-',
  },
})
export class HotkeysState {

}
