import {
  highlightWords,
  valueIsStartOfNewWord,
  getNextMatchIndex,
  getAdditionalIndexes,
  getValidMatch,
  getIndexOfOriginalText,
} from './jb-highlight.pipe';

describe('JbHighlightPipe', () => {
  describe('highlightWords()', () => {
    describe('when both the search term and search result are strings without punctuation', () => {
      const searchResult = 'San Jose San Juan New York';
      const searchTerm = 'Sa';
      const lowerCaseSearchTerm = 'sa';
      const expected = '<strong>Sa</strong>n Jose San Juan New York';

      it('should wrap the first instance of searchTerm in strong tag when at beginning of word', () => {
        expect(highlightWords(searchResult, searchTerm)).toEqual(expected);
      });

      it('should be case insensitive', () => {
        expect(highlightWords(searchResult, lowerCaseSearchTerm)).toEqual(
          expected
        );
      });
    });

    it('should not highlight anything if search term has only punctuation', () => {
      const searchResult = 'St. Paul, MN (MSP)';
      const searchTerm = ', ';
      const expected = 'St. Paul, MN (MSP)';
      expect(highlightWords(searchResult, searchTerm)).toEqual(expected);
    });
    describe('when original text is a string with punctuation', () => {
      it('should wrap all characters if the user inputs punctuation and letters in a strong tag', () => {
        const originalText = 'St. - Paul, MN! (MSP)';
        const searchTerm = 'St. - Paul';
        const expected = '<strong>St. - Paul</strong>, MN! (MSP)';
        expect(highlightWords(originalText, searchTerm)).toEqual(expected);
      });

      it('should wrap all characters in a strong tag if the user inputs letters only', () => {
        const originalText = 'St. - Paul, MN! (MSP)';
        const searchTerm = 'MSP';
        const expected = 'St. - Paul, MN! (<strong>MSP</strong>)';
        expect(highlightWords(originalText, searchTerm)).toEqual(expected);
      });
      it('should not wrap any characters in a strong tag if the search term has no matches', () => {
        const originalText = 'St. Paul, MN (MSP)';
        const searchTerm = 'alex';
        const expected = 'St. Paul, MN (MSP)';
        expect(highlightWords(originalText, searchTerm)).toEqual(expected);
      });
    });
  });
});

describe('valueIsStartOfNewWord', () => {
  const text = 'New York';
  const startIndex = 4;

  it('should return true if index is start of a new word', () => {
    expect(valueIsStartOfNewWord(text, startIndex)).toBe(true);
  });

  const text2 = 'Alabama';

  it('should return false if index is found within a word and is not at beginning of word', () => {
    expect(valueIsStartOfNewWord(text2, startIndex)).toBe(false);
  });
});

describe('getNextMatchIndex', () => {
  const text = 'Alabama bam';
  const searchTerm = 'bam';
  const startIndex = 4;
  const nextIndex = 8;

  it('should ', () => {
    expect(getNextMatchIndex(text, searchTerm, startIndex)).toEqual(nextIndex);
  });
});

describe('getAdditionalIndexes', () => {
  const text = 'Detroit, Michigan!';
  const searchLength = text.length;
  const punctuationTotal = 2;

  it('should should count the instances of punctuation', () => {
    expect(getAdditionalIndexes(text, searchLength)).toEqual(punctuationTotal);
  });

  const text2 = 'Detroit & Michigan';
  const punctuationTotal2 = 0;

  it('should ignore the ampersand character', () => {
    expect(getAdditionalIndexes(text2, searchLength)).toEqual(
      punctuationTotal2
    );
  });
});

describe('getValidMatch', () => {
  const text = 'texas';
  const searchTerm = 't';
  const indexOfValidSearchTerm = 0;

  it('should should return an index if search term is a valid match', () => {
    expect(getValidMatch(text, searchTerm, indexOfValidSearchTerm)).toEqual(
      indexOfValidSearchTerm
    );
  });

  const text2 = 'alabama bam';
  const searchTerm2 = 'bam';
  const indexOfValidSearchTerm2 = 8;

  it('should should return the next valide index if search term is not a valid match', () => {
    expect(getValidMatch(text2, searchTerm2, indexOfValidSearchTerm2)).toEqual(
      indexOfValidSearchTerm2
    );
  });
});

describe('getIndexOfOriginalText ', () => {
  const substringCleanText = 11;
  const substringOriginalText = 14;
  const searchTerm = 'MSP';
  const originalText = 'St. Paul, MN (MSP)';
  it('should increment the substringStartIndex until it matches the searchTerm', () => {
    expect(
      getIndexOfOriginalText(searchTerm, originalText, substringCleanText)
    ).toEqual(substringOriginalText);
  });
});
