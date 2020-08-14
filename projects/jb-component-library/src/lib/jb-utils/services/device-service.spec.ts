import { JbDeviceService } from './device-service';
import { NAVIGATOR } from '../injection-tokens';

describe('Device Service', () => {
  it('isDevice should return false', () => {
    const deviceAgent = new JbDeviceService(NAVIGATOR);
    expect(deviceAgent.isDevice()).toBeFalsy();
  });
  it('isDevice should return true', () => {
    const navigatorMock = {
      // tslint:disable:max-line-length
      userAgent:
        'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36',
    };
    const mobileAgent = new JbDeviceService(navigatorMock);
    expect(mobileAgent.isDevice()).toBeTruthy();
  });
});
