export interface PlayerListItem {
  id: number;
  name: string;
}

export interface ListProps<T = string> {
  items: T[];
  onClick: (value: T) => void;
}