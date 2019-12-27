import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { AddFilterAction, RemoveFilterAction } from './block-list.actions';
import { BlockerService } from '../../components/blocker/blocker.service';
import { append, patch, removeItem } from '@ngxs/store/operators';

export interface BlockListStateModel {
  filters: string[];
}

const BLOCK_LIST_STATE_TOKEN = new StateToken<BlockListStateModel>('blockList');

@State<BlockListStateModel>({
  name: BLOCK_LIST_STATE_TOKEN,
  defaults: { filters: [] },
})
export class BlockListState {
  constructor(private blocker: BlockerService) {
  }

  @Action(AddFilterAction)
  addFilter(ctx: StateContext<BlockListStateModel>, { filter }: AddFilterAction) {
    const { filters } = ctx.getState();
    const payload = filter
      .filter((item) => filters.indexOf(item) < 0)
      .map((item) => item.trim());

    ctx.setState(patch<BlockListStateModel>({
      filters: append(payload),
    }));

    this.blocker.applyBlock(ctx.getState().filters)
  }

  @Action(RemoveFilterAction)
  removeFilter(ctx: StateContext<BlockListStateModel>, { filter }: RemoveFilterAction) {
    ctx.setState(patch<BlockListStateModel>({
      filters: removeItem((item: string) => item === filter),
    }));
  }

  @Selector()
  static getFilters(state: BlockListStateModel) {
    return state.filters;
  }
}
