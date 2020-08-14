import { elementHasContent } from './utilities.functions';

describe('Utility Functions', () => {
  let element;

  describe('hasContent', () => {
    it('hasContent should return false when given an empty element reference', () => {
      element = document.createElement('p');
      const expected = false;
      const actual = elementHasContent(element);

      expect(actual).toEqual(expected);
    });

    it('hasContent should return true when given an element reference with content', () => {
      element = document.createElement('p');
      const text = document.createTextNode('testing');
      element.appendChild(text);

      const expected = true;
      const actual = elementHasContent(element);

      expect(actual).toEqual(expected);
    });
  });
});
