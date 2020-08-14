export class MockWindow {
  addEventListener = jasmine.createSpy('addEventListener');
  removeEventListener = jasmine.createSpy('removeEventListener');
  location = {
    origin: 'https://www.google.com/',
    href: '',
  };
  navigator = {
    userAgent: 'windows',
  };
  open = jasmine.createSpy('open');
  innerHeight;
  innerWidth;
  pageXOffset;
  pageYOffset;
  screen = {
    height: 0,
  };
  onscroll = jasmine.createSpy('scroll');
}
