import { Action, State, StateContext } from '@ngxs/store';
import { DownloadItem } from './types';
import { AddDownloadItem } from './downloads.actions';

interface DownloadsModel {
  [key: string]: DownloadItem;
}

type Context = StateContext<DownloadsModel>

@State<DownloadsModel>({
  name: 'downloads',
  defaults: {},
})
export class DownloadsState {
  @Action(AddDownloadItem)
  addDownload(ctx: Context, { key, config }: AddDownloadItem) {
    ctx.patchState({ [key]: config });
  }
}
