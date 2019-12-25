export class AddFilterAction {
  static readonly type = '[Block list] Add filter';

  constructor(
    public filter: string,
  ) {
  }
}

export class RemoveFilterAction {
  static readonly type = '[Block list] Remove filter';

  constructor(
    public filter: string,
  ) {
  }
}
