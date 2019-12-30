export enum ActionTypes {
  TOGGLE_SUSPEND = '[Preferences] Toggle suspend',
  BUTTON_INSERT = '[Preferences] Toggle button insert',
}

export class ToggleSuspend {
  static readonly type = ActionTypes.TOGGLE_SUSPEND;
}

export class ToggleButtonInsert {
  static readonly type = ActionTypes.BUTTON_INSERT;
}
