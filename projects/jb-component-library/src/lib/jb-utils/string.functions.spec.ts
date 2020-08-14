import {
  containsWordBeginningWith,
  escapeRegexCharacters,
  escapeCommonPunctuations,
  containsWordAndPunctuation,
} from './string.functions';

describe('String Functions', () => {
  describe('escapeRegexCharacters', () => {
    it('should return new string with all regex characters removed', () => {
      const str = 'Th^is [is a st]rin(g wit-h r.ege?x chara)cters';
      const expected = `Th^is \\[is a st\\]rin(g wit-h r.ege?x chara)cters`;
      expect(escapeRegexCharacters(str)).toBe(expected);
    });
  });

  describe('containsWordBeginningWith', () => {
    const text = 'San Fransisco, CA';

    it('should return true if text contains a word that begins with search', () => {
      const search = 'CA';
      expect(containsWordBeginningWith(search)(text)).toBe(true);
    });

    it('should return false if text does not contain a word that begins with search', () => {
      const search = 'Disney';
      expect(containsWordBeginningWith(search)(text)).toBe(false);
    });
  });

  describe('containsWordBeginningWithAndPunctuation', () => {
    it('should return true if search term is empty', () => {
      const search = '';
      const text = 'any string';
      expect(containsWordAndPunctuation(search)(text)).toEqual(true);
    });

    it('should return false if search term is not empty but has no content', () => {
      const search = ' ';
      const text = 'any string';
      expect(containsWordAndPunctuation(search)(text)).toEqual(false);
    });

    describe('search string has punctuation', () => {
      it('should return true if text contains search string that is word with punctuations', () => {
        const text = 'St. Paul, MN (MSP)';
        const searches = ['(MSP)', 'st.', 't. p', 'st. paul, mn'];
        searches.forEach((search) => {
          expect(containsWordAndPunctuation(search)(text)).toEqual(true);
        });
      });

      it('should return true if text contains search string that is only a punctuation', () => {
        const text = 'St. Paul, MN (MSP)';
        const searches = ['. ', ', ', '('];
        searches.forEach((search) => {
          expect(containsWordAndPunctuation(search)(text)).toEqual(true);
        });
      });

      it('should return false if text does not contain the search string', () => {
        const text = 'St. Paul, MN (MSP)';
        const searches = ['[M', '*', '/'];
        searches.forEach((search) => {
          expect(containsWordAndPunctuation(search)(text)).toEqual(false);
        });
      });
    });

    describe('search string does not have punctuation', () => {
      it('should return true if text contains search string', () => {
        const text = 'St. Paul, MN (MSP)';
        const searches = [
          'st paul',
          'mn',
          'msp',
          'st paul mn',
          'st paul mn msp',
        ];
        searches.forEach((search) => {
          expect(containsWordAndPunctuation(search)(text)).toEqual(true);
        });
      });

      it('should return false if text does not contain search string', () => {
        const text = 'St. Paul, MN (MSP)';
        const searches = ['lucia', 'mu', 'mlp'];
        searches.forEach((search) => {
          expect(containsWordAndPunctuation(search)(text)).toEqual(false);
        });
      });
    });
  });

  describe('escapeCommonPunctuations', () => {
    it('should return a new string with no commas or periods', () => {
      const str = 'This. string, my! string';
      const expected = 'This string my string';
      expect(escapeCommonPunctuations(str)).toBe(expected);
    });
  });
});
