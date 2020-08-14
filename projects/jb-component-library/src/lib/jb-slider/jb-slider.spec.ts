import { JbSliderComponent } from './jb-slider.component';
import { createStub } from '../test-helpers';

describe('JbSliderComponent', () => {
  let mockComponent: JbSliderComponent;
  const rendererMock = createStub();

  beforeEach(() => {
    mockComponent = new JbSliderComponent(document, rendererMock);
    mockComponent.value = 1;
  });

  describe('updateSliderValue', () => {
    it('should check if value is withInRange', () => {
      mockComponent.minValue = 5;
      mockComponent.maxValue = 10;
      mockComponent.updateSliderValue(7);
      expect(mockComponent.value).toBe(7);
    });

    it('should check if value is not withInRange', () => {
      mockComponent.minValue = 5;
      mockComponent.maxValue = 10;
      mockComponent.updateSliderValue(4);
      expect(mockComponent.value).toBe(5);
    });

    it('should check if minValue is updated, value should stay same', () => {
      mockComponent.minValue = 5;
      mockComponent.maxValue = 10;
      mockComponent.updateSliderValue(4);
      expect(mockComponent.value).toBe(5);

      mockComponent.minValue = 4;
      expect(mockComponent.value).toBe(5);
    });
  });

  describe('setVisibilityBounds', () => {
    it('should set minVisible and maxVisible to minValue and maxValue when undefined', () => {
      mockComponent.minValue = 5;
      mockComponent.minVisible = undefined;
      mockComponent.maxVisible = undefined;
      mockComponent.maxValue = 10;
      mockComponent.setVisibilityBounds();
      expect(mockComponent.minVisible).toBe(5);
      expect(mockComponent.maxVisible).toBe(10);
    });
    it('should set minVisible and maxVisible to minValue and maxValue when outside bounds', () => {
      mockComponent.minValue = 5;
      mockComponent.minVisible = 6;
      mockComponent.maxVisible = 9;
      mockComponent.maxValue = 10;
      mockComponent.setVisibilityBounds();
      expect(mockComponent.minVisible).toBe(5);
      expect(mockComponent.maxVisible).toBe(10);
    });
  });

  describe('changeValue', () => {
    it('should change the value of the slider', () => {
      const newValue = 2;
      mockComponent.changeValue(newValue);
      expect(mockComponent.value).toEqual(newValue);
    });
  });
});
