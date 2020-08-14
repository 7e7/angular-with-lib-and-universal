import { JbVideoComponent } from './jb-video.component';
import { createStub } from '../test-helpers';

const createDeviceServiceMock = (isDeviceResult: boolean) =>
  createStub({
    isDevice: () => isDeviceResult,
  });

describe('JbVideoComponent', () => {
  let component: JbVideoComponent;

  beforeEach(() => {
    component = new JbVideoComponent(
      createStub(),
      createStub(),
      createStub(),
      createStub(),
      createStub(),
      createDeviceServiceMock(false)
    );
  });

  describe('shouldOpenInModal', () => {
    it('should return true if not mobile device and openInModal is true', () => {
      component.openInModal = true;
      expect(component.shouldOpenInModal()).toBe(true);
    });

    it('should return false if openInModal is false', () => {
      component.openInModal = false;
      expect(component.shouldOpenInModal()).toBe(false);
    });

    it('should return false is mobile device', () => {
      component.deviceService = createDeviceServiceMock(true);
      component.openInModal = true;
      expect(component.shouldOpenInModal()).toBe(false);
    });
  });

  describe('openModal', () => {
    it('should set title, video ID and caption', () => {
      const dialogInstance = {
        title: '',
        videoId: '',
        caption: '',
      };

      component.dialogService = createStub({
        openDialog: () => dialogInstance,
      });

      component.title = 'One Cool Title';
      component.videoId = 'abcdefg';
      component.caption = 'The prettiest caption in the whole wide world';

      component.openModal(createStub());
      expect(dialogInstance.title).toBe(component.title);
      expect(dialogInstance.videoId).toBe(component.videoId);
      expect(dialogInstance.caption).toBe(component.caption);
    });
  });

  describe('playVideo', () => {
    it('should set thumbnailIsClicked to true', () => {
      component.thumbnailIsClicked = false;
      component.createPlayer = () => ({});
      component.playVideo();
      expect(component.thumbnailIsClicked).toBe(true);
    });

    it('should create the player', () => {
      const player = {
        isAGoodFakePlayer: true,
      };

      component.createPlayer = (...args) => {
        component.player = player;
      };

      component.playVideo();
      expect(component.player).toBe(player);
    });
  });
});
