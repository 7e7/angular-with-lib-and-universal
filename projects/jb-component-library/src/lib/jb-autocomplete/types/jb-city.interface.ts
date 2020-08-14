import { JbCitySubtitle } from './jb-city-subtitle.interface';

export interface JbCity {
  code: string;
  name: string;
  needle?: string;
  jb?: boolean;
  iconName?: string;
  fillColor?: string;
  subTitle?: JbCitySubtitle;
  hasIcon?: boolean;
}
