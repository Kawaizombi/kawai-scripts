export enum ActionTypes {
  TOGGLE_SUSPEND = '[Preferences] Toggle suspend',
  BUTTON_INSERT = '[Preferences] Toggle button insert',
  STOP_BLOCKED = '[Preferences] Toggle stop blocked',
}

export class ToggleSuspend {
  static readonly type = ActionTypes.TOGGLE_SUSPEND;
}

export class ToggleButtonInsert {
  static readonly type = ActionTypes.BUTTON_INSERT;
}

export class ToggleStopBlocked {
  static readonly type = ActionTypes.STOP_BLOCKED;
}
