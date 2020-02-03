export class ChangeShortcut {
  static type = '[Shortcuts] Change';

  constructor(
    public key: string,
    public shortcut: string,
  ) {
  }
}

export class ResetShortcuts {
  static type = '[Shortcuts] Reset';
}
