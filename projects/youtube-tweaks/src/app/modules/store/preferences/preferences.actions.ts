export class ToggleShortcuts {
  static type = '[Preferences] Toggle shortcuts';
}

export class ToggleAutoStart {
  static type = '[Preferences] Toggle auto start';
}

export class SetDefaultSpeed {
  static type = '[Preferences] Set default speed';

  constructor(
    public speed: number,
  ) {
  }
}

export class SetDefaultQuality {
  static type = '[Preferences] Set default quality';

  constructor(
    public quality: string,
  ) {
  }
}
