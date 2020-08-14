import { isValidInputType } from './jb-input-type.functions';

describe('isValidInputType', () => {
  it('should return true if JbInputType enum contains value', () => {
    expect(isValidInputType('number')).toBe(true);
  });

  it('should return fasle if JbInputType enum does not contain value', () => {
    expect(isValidInputType('pizza')).toBe(false);
  });
});
