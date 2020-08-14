import { JbInputType } from './jb-input-type.enum';

export const isValidInputType = (type: string): boolean =>
  Object.values(JbInputType).includes(JbInputType[type]);
