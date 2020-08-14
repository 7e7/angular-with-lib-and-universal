import { JbIconComponent } from './jb-icon.component';
import { createSimpleChangesMock } from '../test-helpers';
import { icons } from './icon-manifest';
import { JbIconService } from './jb-icon.service';

jest.mock('./icon-manifest', () => ({ icons: { chevron: '<svg></svg>' } }));
const MOCK_ICON_NAME = 'chevron';

describe('JbIconComponent', () => {
  let component: JbIconComponent;
  let service: JbIconService;

  let nativeElementMock;
  let svgElementMock;
  let rendererMock;

  const changeComponentInput = (name, value) => {
    component[name] = value;
    component.ngOnChanges(createSimpleChangesMock(name, value));
  };

  beforeEach(() => {
    svgElementMock = {
      setAttribute: jest.fn(),
      removeAttribute: jest.fn(),
    };

    nativeElementMock = {
      setAttribute: jest.fn(),
      removeAttribute: jest.fn(),
      svgElement: svgElementMock,
      firstChild: svgElementMock,
      className: 'db fill-red',
      querySelector(name: 'svg') {
        return svgElementMock;
      },
    };

    rendererMock = {
      addClass: jest.fn(),
    };

    service = new JbIconService(icons as any);

    component = new JbIconComponent(
      { nativeElement: nativeElementMock },
      rendererMock,
      service
    );
  });

  it('should not display anything if a known name is not given', () => {
    const iconName = 'foo';
    changeComponentInput('name', iconName);
    component.ngOnChanges(createSimpleChangesMock('name', iconName));
    expect(nativeElementMock.innerHTML).toBeUndefined();
  });

  it('should display the correct svg if a known name is given', () => {
    changeComponentInput('name', MOCK_ICON_NAME);
    expect(nativeElementMock.innerHTML).toBeDefined();
  });

  describe('when an icon is displayed', () => {
    const verifySvgAttributeAdded = (name: string, value: string) => {
      changeComponentInput(name, value);
      expect(nativeElementMock.svgElement.setAttribute.mock.calls[0]).toEqual([
        name,
        value,
      ]);
    };

    const verifySvgAttributeRemoved = (name: string) => {
      changeComponentInput(name, undefined);
      expect(
        nativeElementMock.svgElement.removeAttribute.mock.calls[0]
      ).toEqual([name]);
    };

    beforeEach(() => {
      component.name = MOCK_ICON_NAME;
      component.height = '40';
      component.width = '40';
      component.stroke = 'red';
    });

    it('should set the height on the svg if a value is given', () => {
      verifySvgAttributeAdded('height', '40');
    });

    it('should remove the height from the svg if the value is removed', () => {
      verifySvgAttributeRemoved('height');
    });

    it('should set the width on the svg if a value is given', () => {
      verifySvgAttributeAdded('width', '40');
    });

    it('should remove the width from the svg if the value is removed', () => {
      verifySvgAttributeRemoved('width');
    });

    it('should set the stroke on the svg if a value is given', () => {
      verifySvgAttributeAdded('stroke', 'red');
    });

    it('should remove the stroke from the svg if the value is removed', () => {
      verifySvgAttributeRemoved('stroke');
    });

    it('should set the viewBox on the svg if a value is given', () => {
      verifySvgAttributeAdded('viewBox', '10 10 0 0');
    });

    it('should remove the viewBox from the svg if the value is removed', () => {
      verifySvgAttributeRemoved('viewBox');
    });
  });

  describe('when setting an aria-label', () => {
    beforeEach(() => {
      component.name = MOCK_ICON_NAME;
    });

    it('should set the label on the host tag if a value is given', () => {
      const label = 'hello world';
      changeComponentInput('label', label);
      expect(nativeElementMock.setAttribute.mock.calls[1]).toEqual([
        'aria-label',
        label,
      ]);
    });

    it('should remove the label from the host tag if the value is removed', () => {
      changeComponentInput('label', undefined);
      expect(nativeElementMock.removeAttribute.mock.calls[0]).toEqual([
        'aria-label',
      ]);
    });

    it('should set the aria-hidden attribute on the host tag if no label is given', () => {
      expect(nativeElementMock.setAttribute.mock.calls[0]).toEqual([
        'aria-hidden',
        'true',
      ]);
    });

    it('should remove the aria-hidden attribute from the host tag if a label is given', () => {
      const label = 'hello world';
      changeComponentInput('label', label);
      expect(nativeElementMock.removeAttribute.mock.calls[0]).toEqual([
        'aria-hidden',
      ]);
    });
  });
  describe('elementHasClass', () => {
    it("should return true when there is a match in the element's class list", () => {
      expect(
        component.elementHasClass({ nativeElement: nativeElementMock })
      ).toBe(true);
    });
    it("should return false when there is no match in the element's class list", () => {
      nativeElementMock.className = 'db';
      expect(
        component.elementHasClass({ nativeElement: nativeElementMock })
      ).toBe(false);
    });
    it('should return true when fill class is only class', () => {
      nativeElementMock.className = 'fill-red';
      expect(
        component.elementHasClass({ nativeElement: nativeElementMock })
      ).toBe(true);
    });
    it('should return false if fill-something is found inside of other class names', () => {
      nativeElementMock.className = 'foofill-bar';
      expect(
        component.elementHasClass({ nativeElement: nativeElementMock })
      ).toBe(false);
    });
  });
});
