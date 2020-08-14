import { BreadcrumbsParentPage } from './breadcrumbs-parent-page.type';

export interface BreadcrumbsItem {
  name: string;
  href: string;
  parentPages: BreadcrumbsParentPage[];
}
