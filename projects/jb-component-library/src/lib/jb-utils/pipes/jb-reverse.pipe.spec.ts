import { JbReversePipe } from './jb-reverse.pipe';

describe('Pipe: JbReversePipe', () => {
  let pipe: JbReversePipe;

  beforeEach(() => {
    pipe = new JbReversePipe();
  });

  it('reverses arrays', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'])).toEqual(['d', 'c', 'b', 'a']);
    expect(pipe.transform([1, 2, 3, 4])).toEqual([4, 3, 2, 1]);
  });
});
