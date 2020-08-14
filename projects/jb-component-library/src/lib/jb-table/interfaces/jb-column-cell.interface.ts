export interface JbColumnCellInterface {
  id: number;
  columnId: number;
  value: string;
  type: 'icon' | 'string';
  iconColor?: string;
  iconLabel?: string;
  sortValue?: number;
  isFooter?: boolean;
  isLastRow?: boolean;
  isSubHeader?: boolean;
}
