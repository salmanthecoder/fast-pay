import { ConvertSpaceToDashPipe } from './convert-space-to-dash.pipe';

describe('ConvertSpaceToDashPipe', () => {
  let pipe: ConvertSpaceToDashPipe;

  beforeEach(() => {
    pipe = new ConvertSpaceToDashPipe();
  });

  it('pipe transforms "my test" to "my-test"', () => {
    expect(pipe.transform('my test')).toEqual('my-test');
  });

  it('pipe transforms "my Name" to "my-Name"', () => {
    expect(pipe.transform('my Name')).toEqual('my-Name');
  });
});
