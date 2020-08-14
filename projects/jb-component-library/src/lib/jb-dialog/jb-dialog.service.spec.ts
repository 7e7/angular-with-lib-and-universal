import { JbDialogService } from './jb-dialog.service';

const componentRefInstanceMock = {
  dialogService: {
    close: undefined,
    componentReference: undefined,
    domService: jest.fn(),
    initialFocusedElement: undefined,
  },
};

describe('DialogService', () => {
  let service: JbDialogService;
  let domService: any;

  beforeEach(() => {
    const componentRef = {
      hostView: { rootNodes: [] },
      instance: componentRefInstanceMock,
    };
    domService = {
      appendComponent: () => componentRef,
      getFocusableElements: () => [],
      removeComponent: () => undefined,
    };
    service = new JbDialogService(domService);
  });

  describe('afterClosed()', () => {
    beforeEach(() => {
      service.openDialog({} as any);
    });

    it('should emit after closed', () => {
      const afterClosed = jest.fn();
      service.afterClosed().subscribe(afterClosed);

      service.closeDialog();

      expect(afterClosed).toHaveBeenCalled();
    });
  });

  describe('getComponentReference', () => {
    it('should return the Component Reference instance mock when the dialog instance exists', () => {
      service.openDialog(jest.fn());
      expect(service.getComponentReference()).toEqual(componentRefInstanceMock);
    });

    it('should return undefined when the dialog instance does not exists', () => {
      service.closeDialog();
      expect(service.getComponentReference()).toEqual(undefined);
    });
  });
});
