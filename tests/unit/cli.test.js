const { program } = require('commander');
const init = require('../../lib/init');

jest.mock('../../lib/init');

describe('CLI Commands', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should register init command', () => {
    const spy = jest.spyOn(program, 'command');
    require('../../bin/mtpc');
    expect(spy).toHaveBeenCalledWith('init');
  });
});
