import { JbFlightBlockComponent } from './jb-flight-block.component';

describe('JbFlightBlockComponent', () => {
  let mockFlightBlockComponent;

  beforeEach(() => {
    mockFlightBlockComponent = new JbFlightBlockComponent();
  });

  it('should set hasImage to true if an image is passed in', () => {
    mockFlightBlockComponent.image = 'image';

    mockFlightBlockComponent.ngAfterContentInit();

    expect(mockFlightBlockComponent.hasImage).toBe(true);
  });

  it('should set hasFlag to true if a flag is passed in', () => {
    mockFlightBlockComponent.flag = 'flag';

    mockFlightBlockComponent.ngAfterContentInit();

    expect(mockFlightBlockComponent.hasFlag).toBe(true);
  });
});
