import { JbButtonCloseComponent } from './jb-button-close.component';
import { CloseButtonSize } from './types/jb-button-close-size.enum';
import { CloseButtonFill } from './types/jb-button-close-color.enum';

describe('JbButtonCloseComponent', () => {
  let component: JbButtonCloseComponent;

  beforeEach(() => {
    component = new JbButtonCloseComponent();
  });

  it('should be small by default', () => {
    expect(component.size).toBe(CloseButtonSize.SMALL);
  });

  describe('ngOnInit', () => {
    it('should generate the id attribute', () => {
      component.ngOnInit();
      expect(component.id).toBe('jb-button-close-0');
    });
  });

  describe('isLarge', () => {
    it('should return true if size is large', () => {
      component.size = CloseButtonSize.LARGE;
      expect(component.isLarge).toBe(true);
    });
    it('should return false if size is set to small', () => {
      component.size = CloseButtonSize.SMALL;
      expect(component.isLarge).toBe(false);
    });
  });

  describe('isSmall', () => {
    it('should return true if size is small', () => {
      component.size = CloseButtonSize.SMALL;
      expect(component.isSmall).toBe(true);
    });
    it('should return false if size is set to large', () => {
      component.size = CloseButtonSize.LARGE;
      expect(component.isSmall).toBe(false);
    });
  });

  it('should have a white svg fill by default', () => {
    expect(component.svgFill).toBe(CloseButtonFill.WHITE);
  });

  describe('svgFill', () => {
    it('should change the svg fill to whatever it is assigned', () => {
      const fillColor = CloseButtonFill.BLUE;
      component.fill = fillColor;
      expect(component.svgFill).toBe(fillColor);
    });
  });

  describe('onClick', () => {
    it('should emit the close event', (done) => {
      component.close.subscribe(done);
      component.onClick();
    });
  });
});
