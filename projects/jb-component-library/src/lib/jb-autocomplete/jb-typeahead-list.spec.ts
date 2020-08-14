import { JbStandardTypeaheadListComponent } from './components/jb-standard-typeahead-list/jb-standard-typeahead-list.component';

describe('JbTypeAheadList', () => {
  let component: JbStandardTypeaheadListComponent;

  beforeEach(() => {
    component = new JbStandardTypeaheadListComponent();
  });

  describe('isActiveOption', () => {
    it('should return true when provided with the active option', () => {
      component.activeOption = 'one';
      const activeOption = 'one';
      const result = component.isActiveOption(activeOption);

      expect(result).toBe(true);
    });

    it('should return false when provided with inactive option', () => {
      component.activeOption = 'one';
      const activeOption = 'two';
      const result = component.isActiveOption(activeOption);

      expect(result).toBe(false);
    });

    it('should return false when provided with inactive option', () => {
      const activeOption = 'two';
      const result = component.isActiveOption(activeOption);

      expect(result).toBe(false);
    });
  });
});
