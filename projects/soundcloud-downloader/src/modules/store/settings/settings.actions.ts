export class ToggleTrackNumber {
  static readonly type = '[Settings] Toggle track number';

  constructor(public status: boolean) {
  }
}
