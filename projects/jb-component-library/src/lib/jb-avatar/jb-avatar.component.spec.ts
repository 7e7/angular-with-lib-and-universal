import { JbAvatarComponent } from './jb-avatar.component';
import { createStub } from '../test-helpers';

describe('Component: JbErrorComponent', () => {
  let component: JbAvatarComponent;

  beforeEach(() => {
    component = new JbAvatarComponent(
      createStub({ markForCheck: () => false })
    );
  });

  describe('setColor', () => {
    it('should set background and foreground color', () => {
      component.setColor('red', 'green');

      expect(component.placeholderTextColor).toBe('green');
      expect(component.placeholderBackgroundColor).toBe('red');
    });

    it('should default foreground color to white', () => {
      component.setColor('red');

      expect(component.placeholderTextColor).toBe('white');
    });
  });
});
