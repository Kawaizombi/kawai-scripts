import { Action, State, StateContext } from '@ngxs/store';
import { AddDownloadItem, RemoveDownloadItem } from './downloads.actions';

export interface DownloadsModel {
  [key: string]: boolean;
}

type Context = StateContext<DownloadsModel>

@State<DownloadsModel>({
  name: 'downloads',
  defaults: {},
})
export class DownloadsState {
  @Action(AddDownloadItem)
  add(ctx: Context, { key }: AddDownloadItem) {
    ctx.patchState({ [key]: true });
  }

  @Action(RemoveDownloadItem)
  update(ctx: Context, { key }: RemoveDownloadItem) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: item, ...rest } = ctx.getState();

    ctx.setState(rest);
  }
}
