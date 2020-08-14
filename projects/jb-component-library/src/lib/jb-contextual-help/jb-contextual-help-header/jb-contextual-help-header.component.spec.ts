import { JbContextualHelpHeaderComponent } from './jb-contextual-help-header.component';
import { createStub } from '../../test-helpers';

describe('JbContextualHelpComponent', () => {
  let component: JbContextualHelpHeaderComponent;

  beforeEach(() => {
    component = new JbContextualHelpHeaderComponent();
  });

  describe('onToggleExpansion', () => {
    it('should emit the mouseEvent through the toggleExpansion event emitter', (done) => {
      const mouseEventMock = createStub({ isAGoodMouseEvent: true });

      component.toggleExpansion.subscribe((event: MouseEvent) => {
        expect(event).toBe(mouseEventMock);
        done();
      });

      component.onToggleExpansion(mouseEventMock);
    });
  });
});
