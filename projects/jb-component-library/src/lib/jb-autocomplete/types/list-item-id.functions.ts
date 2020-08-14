export const getListItemId = (listId: string) => (index: number): string =>
  `${listId}-option-item-${index}`;
