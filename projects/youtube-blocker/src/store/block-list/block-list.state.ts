import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { AddFilterAction, RemoveFilterAction } from './block-list.actions';
import { BlockerService } from '../../components/blocker/blocker.service';

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
    const alreadyExist = filters.indexOf(filter) > -1;

    if(!alreadyExist) {
      ctx.patchState({
        filters: [...filters, filter.trim()],
      });
    }
    this.blocker.applyBlock(ctx.getState().filters)
  }

  @Action(RemoveFilterAction)
  removeFilter(ctx: StateContext<BlockListStateModel>, { filter }: RemoveFilterAction) {
    const { filters } = ctx.getState();

    ctx.patchState({
      filters: filters.filter((item) => item !== filter),
    });
  }

  @Selector()
  static getFilters(state: BlockListStateModel) {
    return state.filters;
  }
}
