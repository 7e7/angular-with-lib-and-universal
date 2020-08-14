import { JbActionMenuComponent } from './jb-action-menu.component';
import { createStub } from '../test-helpers';
import { JbViewPortService } from './../jb-utils/services/viewport.service';
import { BehaviorSubject } from 'rxjs';

describe('Component: JbActionMenuComponent', () => {
  let component: JbActionMenuComponent;
  const mobileSubject$ = new BehaviorSubject<boolean>(false);
  const mockViewPortService: Partial<JbViewPortService> = {
    isMobile$: () => mobileSubject$,
  };

  const rendererMock: any = {
    setAttribute: jest.fn(),
    appendChild: jest.fn(),
  };
  const viewportServiceMock = createStub(mockViewPortService);
  beforeEach(() => {
    component = new JbActionMenuComponent(rendererMock, viewportServiceMock);
    mobileSubject$.next(false);
    component.ngAfterViewInit();
  });
  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should split the content items between inside and outside', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    const insideItems = component.getInsideItems(items);
    const outsideItems = component.getOutsideItems(items);

    expect(insideItems.length).toBe(2);
    expect(outsideItems.length).toBe(2);
  });

  it('should sort all content items to inside on mobile', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    // mobileSubject$.next(true);
    // TODO: investigate why .next is not causing the subscription to be hit
    // with this test
    component.isMobile = true;
    const insideItems = component.getInsideItems(items);
    const outsideItems = component.getOutsideItems(items);

    expect(insideItems.length).toBe(4);
    expect(outsideItems.length).toBe(0);
  });

  it('should not have any inside items if items are less than max outside items', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    component.outsideItemsCount = 4;
    const insideItems = component.getInsideItems(items);
    const outsideItems = component.getOutsideItems(items);

    expect(insideItems).toEqual([]);
    expect(outsideItems.length).toBe(4);
  });

  it('should still work when the outsideItemsCount is greater than the number of items provided', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    component.outsideItemsCount = 5;
    const insideItems = component.getInsideItems(items);
    const outsideItems = component.getOutsideItems(items);

    expect(insideItems).toEqual([]);
    expect(outsideItems.length).toBe(4);
  });

  it('should not have errors no child items are provided', () => {
    expect(() => component.sortActionItems([])).not.toThrow();
  });

  it('should not throw an error when the component is destroyed', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should set an attribute on the list item native element ', () => {
    component.createListItem({ nativeElement: '' });
    expect(rendererMock.setAttribute).toHaveBeenCalled();
  });

  it('should append the action item to the destination dom element ', () => {
    component.appendToParent({}, {});
    expect(rendererMock.appendChild).toHaveBeenCalled();
  });

  it('should update isOpen to false as the dropdown menu is closed', () => {
    component.isOpen = true;
    component.afterMenuClosed();
    expect(component.isOpen).toEqual(false);
  });

  it('should update isOpen to true as the dropdown menu is opened', () => {
    component.isOpen = false;
    component.afterMenuOpened();
    expect(component.isOpen).toEqual(true);
  });
});
