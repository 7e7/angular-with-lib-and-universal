import { Injectable, Inject } from '@angular/core';

import { NAVIGATOR } from '../injection-tokens';

@Injectable({ providedIn: 'root' })
export class JbDeviceService {
  constructor(@Inject(NAVIGATOR) private navigator) {}

  /** Checks if the agent is a mobile device or not */
  isDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      this.navigator.userAgent
    );
  }

  isIOS(): boolean {
    return /iPhone|iPad|iPod/i.test(this.navigator.userAgent);
  }
}
