import createHeader from '../create-header';

const config = {
  name: 'User script',
  noframes: true,
  grant: [
    'GM_getValue',
    'GM_setValue',
  ],
};

describe('createHeader', () => {
  it('should return header', () => {
    expect(createHeader(config)).toMatchSnapshot();
  });
});
