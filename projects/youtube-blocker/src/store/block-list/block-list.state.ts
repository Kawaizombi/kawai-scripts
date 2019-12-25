import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { AddFilterAction, RemoveFilterAction } from './block-list.actions';

export interface BlockListStateModel {
  filters: string[];
}

const BLOCK_LIST_STATE_TOKEN = new StateToken<BlockListStateModel>('blockList');

@State<BlockListStateModel>({
  name: BLOCK_LIST_STATE_TOKEN,
  defaults: { filters: new Array(100000).fill(0).map((_, i) => i.toString()) },
})
export class BlockListState {
  @Action(AddFilterAction)
  addFilter(ctx: StateContext<BlockListStateModel>, { filter }: AddFilterAction) {
    const { filters } = ctx.getState();
    const alreadyExist = filters.indexOf(filter) > -1;

    if(!alreadyExist) {
      ctx.patchState({
        filters: [...filters, filter],
      });
    }
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
