export interface Toggleable {
  width?: string;
  getIsOpen: () => boolean;
  forceOpen: (isForced: boolean) => void;
  forceClose?: (bool: boolean) => void;
  toggle(): void;
  close(value?: any): void;
  open(value?: any): void;
}
