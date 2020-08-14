import { DomSanitizer } from '@angular/platform-browser';

export class MockDomSanitizer extends DomSanitizer {
  sanitize = jasmine.createSpy('sanitize');
  bypassSecurityTrustHtml = jasmine.createSpy('bypassSecurityTrustHtml');
  bypassSecurityTrustStyle = jasmine.createSpy('bypassSecurityTrustStyle');
  bypassSecurityTrustScript = jasmine.createSpy('bypassSecurityTrustScript');
  bypassSecurityTrustUrl = jasmine.createSpy('bypassSecurityTrustUrl');
  bypassSecurityTrustResourceUrl = jasmine.createSpy(
    'bypassSecurityTrustResourceUrl'
  );
}
