export interface Filters {
  [key: string]: Filter | null | string;
}

export interface Filter {
  id: number;
  menu: string;
}

export interface DropdownType {
  selected: Filter | null;
  setSelected: (key: string, value: Filter) => void;
  name: string;
  menu: Filter[] | null;
}

export interface QueryParams {
  [key: string]: any;
}
