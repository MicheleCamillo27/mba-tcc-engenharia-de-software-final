const KEY = "breadcrumb-data";

export function saveBreadcrumbData(data: any) {
  const current = JSON.parse(localStorage.getItem(KEY) || "{}");

  const updated = { ...current, ...data };

  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getBreadcrumbData() {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}