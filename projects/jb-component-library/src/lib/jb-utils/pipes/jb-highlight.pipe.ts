import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {
  escapeCommonPunctuations,
  containsPunctuation,
} from './../string.functions';

// bolds a value in a string
const highlight = (
  startIndex: number,
  searchTerm: string,
  text: string
): string => {
  let indexBeforeHighlight: number;
  startIndex === 0
    ? (indexBeforeHighlight = 0)
    : (indexBeforeHighlight = startIndex);
  const highlightStartIndex = startIndex;
  const highlightEndIndex = startIndex + searchTerm.length;

  return `${text.slice(0, indexBeforeHighlight)}<strong>${text.slice(
    highlightStartIndex,
    highlightEndIndex
  )}</strong>${text.slice(highlightEndIndex)}`;
};

// checks if a value is 1) at the beginning of the string or 2) the beginning of a word within the string
export const valueIsStartOfNewWord = (text: string, index: number): boolean => {
  const searchTermIsNewWord = text.charAt(index - 1) === ' ';
  const searchTermIsStartOfString = index === 0;
  return searchTermIsNewWord || searchTermIsStartOfString;
};

// returns the index of the next matching value in a string
export const getNextMatchIndex = (
  text: string,
  searchTerm: string,
  index: number
): number => {
  return (index = text.indexOf(searchTerm.toLowerCase(), index + 1));
};

// checks if the search term is a valid match (ie search term === new word or start of string)
export const getValidMatch = (
  text: string,
  subString: string,
  indexOfSubString: number
): number => {
  if (indexOfSubString < 0) {
    return indexOfSubString;
  }
  let index = indexOfSubString;
  if (valueIsStartOfNewWord(text, index) || index === text.length) {
    return index;
  } else {
    index = getNextMatchIndex(text, subString, index);
    return getValidMatch(text, subString, index);
  }
};

export const getIndexOfOriginalText = (
  searchTerm,
  originalText,
  substringStartIndex
): number => {
  while (
    originalText
      .slice(substringStartIndex, substringStartIndex + searchTerm.length)
      .toLocaleLowerCase() !== searchTerm.toLocaleLowerCase() &&
    substringStartIndex < originalText.length
  ) {
    substringStartIndex++;
  }
  return substringStartIndex;
};

export const getAdditionalIndexes = (
  text: string,
  searchLength: number
): number => {
  const additionalIndexes = text
    .slice(0, searchLength)
    .split('')
    .filter((char) => char !== '&') // remove & from count; it can be own word
    .filter(containsPunctuation).length;
  return additionalIndexes;
};

export const highlightWords = (
  originalText: string,
  searchTerm = ''
): string => {
  let substringStartIndex;
  const cleanedSearchTerm = escapeCommonPunctuations(
    searchTerm.toLowerCase()
  ).trim();
  if (!cleanedSearchTerm) {
    return originalText;
  }
  if (containsPunctuation(searchTerm)) {
    substringStartIndex = originalText
      .toLocaleLowerCase()
      .indexOf(searchTerm.toLocaleLowerCase().trim());
  } else {
    const cleanedText = escapeCommonPunctuations(
      originalText.toLowerCase()
    ).trim();
    substringStartIndex = getValidMatch(
      cleanedText,
      cleanedSearchTerm,
      cleanedText.indexOf(cleanedSearchTerm.toLowerCase())
    );
    substringStartIndex = getIndexOfOriginalText(
      searchTerm,
      originalText,
      substringStartIndex
    );
    if (substringStartIndex >= originalText.length) {
      return originalText;
    }
  }

  return highlight(substringStartIndex, searchTerm, originalText);
};

@Pipe({
  // tslint:disable-next-line
  name: 'highlight',
})
export class JbHighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, searchTerm = ''): SafeHtml {
    let value = text;

    if (searchTerm) {
      value = highlightWords(text, searchTerm);
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
