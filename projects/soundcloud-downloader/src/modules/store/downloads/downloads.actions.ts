export class AddDownloadItem {
  static readonly type = '[Downloads] Add';

  constructor(
    public key: string,
  ) {
  }
}

export class RemoveDownloadItem {
  static readonly type = '[Downloads] Remove';

  constructor(
    public key: string,
  ) {
  }
}

export class UpdateDownloadItem {
  static readonly type = '[Downloads] Update';

  constructor(
    public key: string,
  ) {
  }
}
