import { JbActionMenuItemComponent } from './jb-action-menu-item.component';
import { createStub } from '../../test-helpers';

describe('Component: JbActionMenuItemComponent', () => {
  let component: JbActionMenuItemComponent;
  let elementRefMock;

  const rendererMock = createStub({
    // tslint:disable-next-line: no-empty
    setAttribute: () => {},
    appendChild: jest.fn(),
    addClass: jest.fn(),
  });

  beforeEach(() => {
    elementRefMock = {
      nativeElement: {
        disabled: false,
        tagName: 'A',
      },
    };
    component = new JbActionMenuItemComponent(elementRefMock, rendererMock);
  });
  it('should create an instance of Action Menu Item', () => {
    expect(component).not.toBeUndefined();
  });
});
