export type BreadcrumbItem = {
  label: string;
  path?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
};