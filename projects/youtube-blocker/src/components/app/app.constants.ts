import combineCssSelectors from '../../utils/combine-css-rules';

export const OBSERVER_ELEMENT_SELECTOR = combineCssSelectors(
  '#content',
  'ytd-page-manager',
);

export const OBSERVER_CONFIG = { childList: true, subtree: true };
