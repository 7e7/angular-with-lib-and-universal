export interface Column {
  name: string;
  subSection: SubSection[];
}

export interface SubSection {
  name?: string;
  subHeader?: SubHeader[];
  items: Items[];
}

export interface SubHeader {
  href?: string;
  newWindow?: string;
  title: string;
}

export interface Items {
  href?: string;
  newWindow?: string;
  title: string;
}
