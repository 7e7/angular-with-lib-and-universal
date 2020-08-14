export const escapeRegexCharacters = (str: string): string =>
  str.replace(/[{}|[\]\\]/g, '\\$&');

export const escapeCommonPunctuations = (str: string): string => {
  let replacedString = str.replace(/[\.,!@?#$%^*()+\-]/g, ' ');
  replacedString = replacedString.replace(/  +/g, ' '); // replaces multiple spaces with single space
  return replacedString;
};

export const containsWordBeginningWith = (searchTerm: string) => (
  text: string
): boolean => {
  const escaped = escapeCommonPunctuations(escapeRegexCharacters(searchTerm));
  const escapedText = escapeCommonPunctuations(text);
  return escapedText.match(new RegExp(`(^|\\\s)${escaped}`, 'i')) !== null;
};

export const containsPunctuation = (searchTerm: string): boolean => {
  const escaped = /[\.,&()!@?#$%^*+\-]/;
  return searchTerm.match(escaped) !== null;
};

export const containsWordAndPunctuation = (searchTerm: string) => (
  text: string
): boolean => {
  if (!searchTerm) {
    return true;
  }
  searchTerm = searchTerm.trim().toLowerCase();
  if (!searchTerm || !text) {
    return false;
  }

  if (containsPunctuation(searchTerm)) {
    return text.toLowerCase().indexOf(searchTerm) > -1;
  }
  return containsWordBeginningWith(searchTerm)(text);
};
