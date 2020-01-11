import { DownloadItem } from './types';

export class AddDownloadItem {
  static readonly type = '[Downloads] Add';

  constructor(
    public key: string,
    public config: DownloadItem,
  ) {
  }
}

export class UpdateDownloadItem {
  static readonly type = '[Downloads] Update';

  constructor(
    public key: string,
    public config: Partial<DownloadItem>,
  ) {
  }
}
