import { JbTruncatePipe } from './jb-truncate.pipe';

describe('Pipe: Truncate', () => {
  const pipe = new JbTruncatePipe();
  const testString = `Lorem ipsum dolor sit amet, est ut omnis consul.
    Wisi integre constituam at vim, te vix novum vitae. Sanctus delicata
    id eum, persius minimum est te. Sit ad quot principes scriptorem. Vis
    fugit facer euismod an, an vix eius justo.`;

  it('should truncate to a max-length', () => {
    expect(pipe.transform(testString, 25, false)).toEqual(
      'Lorem ipsum dolor sit a…'
    );
  });

  it('should truncate with a word-boundary', () => {
    expect(pipe.transform(testString, 25, true)).toEqual(
      'Lorem ipsum dolor sit…'
    );
  });

  it('should truncate with a custom terminator string', () => {
    expect(pipe.transform(testString, 25, false, 'END')).toEqual(
      'Lorem ipsum dolor sitEND'
    );
  });
});
