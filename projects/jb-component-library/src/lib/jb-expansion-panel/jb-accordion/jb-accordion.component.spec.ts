import { JbAccordionComponent } from './jb-accordion.component';
import { JbExpansionPanelComponent } from '../jb-expansion-panel.component';
import { QueryList } from '@angular/core';
import { createStub } from '../../test-helpers';

/*
 * Test Helpers
 */
const createExpansionPanelMock = (expanded: boolean = false) =>
  createStub({
    header: createStub({
      focusButton: jest.fn(),
    }),
    openPanel: jest.fn(),
    closePanel: jest.fn(),
    isExpanded: expanded,
  });

/*
 * Test Suite
 */
describe('JbAccordionComponent', () => {
  let component: JbAccordionComponent;
  let keyboardEventMock;

  beforeEach(() => {
    component = new JbAccordionComponent();
    component.panels = new QueryList<JbExpansionPanelComponent>();
    keyboardEventMock = createStub({
      preventDefault: () => false,
      stopPropagation: () => false,
    });
  });

  describe('Panel Actions', () => {
    let lastHeader;
    let firstHeader;

    beforeEach(() => {
      component.panels.reset([
        createExpansionPanelMock(),
        createExpansionPanelMock(),
      ]);

      firstHeader = component.panels.first.header;
      lastHeader = component.panels.last.header;
    });

    describe('focusLastPanel', () => {
      it('should focus the last panel', () => {
        component.focusLastPanel(keyboardEventMock);
        expect(firstHeader.focusButton.mock.calls.length).toBe(0);
        expect(lastHeader.focusButton.mock.calls.length).toBe(1);
      });
    });

    describe('focusFirstPanel', () => {
      it('should focus the first panel', () => {
        component.focusFirstPanel(keyboardEventMock);
        expect(firstHeader.focusButton.mock.calls.length).toBe(1);
        expect(lastHeader.focusButton.mock.calls.length).toBe(0);
      });
    });

    describe('focusNextPanel', () => {
      it('should focus the next panel if there is one', () => {
        component.focusNextPanel(keyboardEventMock, 0);
        expect(lastHeader.focusButton.mock.calls.length).toBe(1);
      });

      it('should focus the only panel if there is only one', () => {
        let onlyPanel;
        onlyPanel = createExpansionPanelMock();
        component.panels.reset([onlyPanel]);

        component.focusNextPanel(keyboardEventMock, 0);
        expect(onlyPanel.header.focusButton.mock.calls.length).toBe(1);
      });
    });

    describe('closeOtherPanels', () => {
      it('should close all panels except for one at index defined by parameter', () => {
        const panel1 = createExpansionPanelMock(true);
        const panel2 = createExpansionPanelMock();
        const panel3 = createExpansionPanelMock(true);

        component.panels.reset([panel1, panel2, panel3]);

        component.closeOtherPanels(1);

        expect(panel1.closePanel.mock.calls.length).toBe(1);
        expect(panel2.closePanel.mock.calls.length).toBe(0);
        expect(panel3.closePanel.mock.calls.length).toBe(1);
      });
    });
  });
});
