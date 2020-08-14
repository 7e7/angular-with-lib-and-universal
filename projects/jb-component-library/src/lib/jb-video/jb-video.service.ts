import {
  Injectable,
  SecurityContext,
  Renderer2,
  RendererFactory2,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class JbVideoService implements OnDestroy {
  isScriptLoaded: boolean;
  private renderer: Renderer2;

  constructor(
    private sanitizer: DomSanitizer,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnDestroy() {
    this.isScriptLoaded = false;
  }

  /* Checks if script is already loaded */
  loadScript(): HTMLElement {
    return this.isScriptLoaded ? null : this.createScript();
  }

  /* Appends the Youtube's iframe's API */
  createScript(): any {
    const scriptElement = this.renderer.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = this.sanitizer.sanitize(
      SecurityContext.URL,
      'https://www.youtube.com/iframe_api'
    );
    scriptElement.id = 'youtube_api_script';
    scriptElement.async = true;
    scriptElement.charset = 'utf-8';
    this.isScriptLoaded = true;

    return scriptElement;
  }
}
