import { JbIncrementerComponent } from './jb-incrementer.component';

describe('JbIncrementerComponent', () => {
  let incrementerComponent;

  beforeEach(() => {
    incrementerComponent = new JbIncrementerComponent(
      {
        isDevice: () => false,
      } as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any
    );
  });

  it('should return false when the increment button is hovered and the max value is met', () => {
    incrementerComponent.max = 1;
    incrementerComponent.value = 1;
    incrementerComponent.decrementHoverHandler(true);
    expect(incrementerComponent.isIncrementFocused).toBe(false);
  });

  it('should return false when the decrement button is hovered and the min value is met', () => {
    incrementerComponent.min = 1;
    incrementerComponent.value = 1;
    incrementerComponent.incrementHoverHandler(true);
    expect(incrementerComponent.isDecrementFocused).toBe(false);
  });

  it('should return true when hovered for increment button', () => {
    incrementerComponent.incrementHoverHandler(true);
    expect(incrementerComponent.isIncrementFocused).toBe(true);
  });

  it('should return true when hovered on decrement button', () => {
    incrementerComponent.min = 1;
    incrementerComponent.decrementHoverHandler(true);
    expect(incrementerComponent.isDecrementFocused).toBe(true);
  });

  it('should add one to the value', (done) => {
    incrementerComponent.onChange.subscribe((event) => {
      expect(event).toEqual(1);
      done();
    });
    incrementerComponent.stepBy(1);
    expect(incrementerComponent.value).toBe(1);
  });

  it('should return true for meeting max value criteria', () => {
    incrementerComponent.value = 5;
    incrementerComponent.max = 5;
    expect(incrementerComponent.isMaxDisable).toBe(true);
  });

  it('should return true for meeting min value criteria', () => {
    incrementerComponent.value = 1;
    incrementerComponent.min = 1;
    expect(incrementerComponent.isMinDisable).toBe(true);
  });

  it('should return false for NOT meeting min value criteria', () => {
    incrementerComponent.value = 3;
    incrementerComponent.min = 1;
    expect(incrementerComponent.isMinDisable).toBe(false);
  });

  it('should return the icon name "incrementerUp" for meeting max value criteria', () => {
    incrementerComponent.value = 3;
    incrementerComponent.max = 3;
    expect(incrementerComponent.disableIncrementerUp).toBe('incrementerUp');
  });

  it('should return the icon name "incrementerUpHover" for NOT meeting max value criteria', () => {
    incrementerComponent.value = 3;
    incrementerComponent.max = 4;
    expect(incrementerComponent.disableIncrementerUp).toBe(
      'incrementerUpHover'
    );
  });

  it('should return the icon name "incrementerDown" for meeting min value criteria', () => {
    incrementerComponent.value = 2;
    incrementerComponent.min = 2;
    expect(incrementerComponent.disableIncrementerDown).toBe('incrementerDown');
  });

  it('should return the icon name "incrementerDown" for NOT meeting min value criteria', () => {
    incrementerComponent.value = 3;
    incrementerComponent.min = 2;
    expect(incrementerComponent.disableIncrementerDown).toBe(
      'incrementerDownHover'
    );
  });
});
