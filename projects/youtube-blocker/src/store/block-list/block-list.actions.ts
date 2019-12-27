export enum ActionTypes {
  ADD_FILTER = '[Block list] Add filter',
  REMOVE_FILTER  = '[Block list] Remove filter'
}

export class AddFilterAction {
  static readonly type = ActionTypes.ADD_FILTER;

  constructor(
    public filter: string,
  ) {
  }
}

export class RemoveFilterAction {
  static readonly type = ActionTypes.REMOVE_FILTER;

  constructor(
    public filter: string,
  ) {
  }
}
