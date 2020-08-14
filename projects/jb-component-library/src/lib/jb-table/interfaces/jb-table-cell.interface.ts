export interface JbTableCell {
  id: number;
  columnId: number;
  value: string;
  type: 'icon' | 'string';
  iconColor?: string;
  iconLabel?: string;
  sortValue?: number;
}
