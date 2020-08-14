import { JbExpandableButtonComponent } from './jb-expandable-button.component';

describe('JbExpandButtonComponent', () => {
  let mockExpandableButtonComponent;

  beforeEach(() => {
    mockExpandableButtonComponent = new JbExpandableButtonComponent();
  });

  describe('onClick', () => {
    it('should toggle the value from false to true', (done) => {
      mockExpandableButtonComponent.value = false;
      mockExpandableButtonComponent.toggle.subscribe((event: boolean) => {
        expect(event).toEqual(true);
        done();
      });
      mockExpandableButtonComponent.onClick();
    });
    it('should toggle the value from true to false', (done) => {
      mockExpandableButtonComponent.value = true;
      mockExpandableButtonComponent.toggle.subscribe((event: boolean) => {
        expect(event).toEqual(false);
        done();
      });
      mockExpandableButtonComponent.onClick();
    });
  });
});
