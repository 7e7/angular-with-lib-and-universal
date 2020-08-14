import { JbLinkWithRouterComponent } from './jb-link-with-router.component';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { JbDomService } from '../../jb-utils/services/dom.service';

describe('JbLinkComponent', () => {
  let component;
  const router = Router;
  const domService = JbDomService;
  const elmRef = ElementRef;
  let spy;

  beforeEach(() => {
    component = new JbLinkWithRouterComponent(
      router as any,
      domService as any,
      elmRef as any
    );

    spy = jest
      .spyOn(component, 'ngOnInit')
      .mockImplementation((val) =>
        val.link && !val.href
          ? (component.isRouterLink = true)
          : (component.isRouterLink = false)
      );
  });

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should set isRouterLink to false by default', () => {
    const expected = false;
    const actual = component.isRouterLink;

    expect(actual).toEqual(expected);
  });

  it('should set isRouterLink to true when a link input is passed in', () => {
    const mockInputs = {
      link: '/my-link',
      href: undefined,
    };

    const isLink = spy(mockInputs);

    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    expect(isLink).toEqual(true);
  });

  it('should set isRouterLink to false when an href is passed in', () => {
    const mockInputs = {
      link: undefined,
      href: 'https://mock.link',
    };

    const isLink = spy(mockInputs);

    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    expect(isLink).toEqual(false);
  });

  it('should set isRouterLink to false when an href and a link are both passed in', () => {
    const mockInputs = {
      link: '/my-link',
      href: 'https://mock.link',
    };

    const isLink = spy(mockInputs);

    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    expect(isLink).toEqual(false);
  });

  it('should set target to _self by default', () => {
    expect(component.target).toBe('_self');
  });

  it('should set rel to null by default', () => {
    expect(component.rel).toBeNull();
  });

  it('should add rel="noopener noreferrer" for security if target=_blank', () => {
    component.target = '_blank';
    component.ngOnChanges();
    expect(component.rel).toBe('noopener noreferrer');
  });
});
