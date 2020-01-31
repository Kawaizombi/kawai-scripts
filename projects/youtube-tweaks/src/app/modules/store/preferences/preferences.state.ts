import { State } from '@ngxs/store';

export interface PreferencesModel {
  defaultSpeed: number;
  defaultQuality: string;
  autoStart: boolean;
}

@State<PreferencesModel>({
  name: 'preferences',
  defaults: {
    defaultSpeed: 1,
    defaultQuality: 'auto',
    autoStart: true,
  },
})
export class PreferencesState {

}
