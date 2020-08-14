import { JbContextualHelpComponent } from './jb-contextual-help.component';
import { createStub } from '../test-helpers';

describe('JbContextualHelpComponent', () => {
  let component: JbContextualHelpComponent;

  beforeEach(() => {
    component = new JbContextualHelpComponent();
    component.header = createStub({
      setIsExpanded: jest.fn(),
    });
  });

  describe('openPanel', () => {
    it('should set isExpanded to true', () => {
      component.isExpanded = false;
      component.openPanel();
      expect(component.isExpanded).toBe(true);
    });

    it('should emit the opened event', (done) => {
      component.opened.subscribe(done);
      component.openPanel();
    });
  });

  describe('closePanel', () => {
    it('should set isExpanded to false', () => {
      component.isExpanded = true;
      component.closePanel();
      expect(component.isExpanded).toBe(false);
    });

    it('should emit the closed event', (done) => {
      component.closed.subscribe(done);
      component.closePanel();
    });
  });

  describe('toggleExpansion', () => {
    it('should open panel if not expanded', () => {
      component.isExpanded = false;
      component.toggleExpansion(createStub());
      expect(component.isExpanded).toBe(true);
    });

    it('should close panel if expanded', () => {
      component.isExpanded = true;
      component.toggleExpansion(createStub());
      expect(component.isExpanded).toBe(false);
    });
  });

  describe('ngOnChanges', () => {
    it('should set expansion if expanded value changes', () => {
      const simpleChangesMock = createStub({
        expanded: { currentValue: true },
      });

      component.isExpanded = false;
      component.ngOnChanges(simpleChangesMock);
      expect(component.isExpanded).toBe(true);
    });
  });
});
