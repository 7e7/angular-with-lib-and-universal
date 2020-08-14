import { JbExpansionPanelRowComponent } from './jb-expansion-panel-row.component';

describe('JbExpansionPanelRowComponent', () => {
  describe('getElementRef', () => {
    let component;
    let nativeElementMock;

    beforeEach(() => {
      nativeElementMock = { isAGoodNativeElement: true };
      component = new JbExpansionPanelRowComponent({
        nativeElement: nativeElementMock,
      });
    });

    it('should return the nativeElement', () => {
      expect(component.getElementRef()).toBe(nativeElementMock);
    });
  });
});
