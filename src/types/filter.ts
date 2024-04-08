export interface Filter {
  id: number | null;
  menu: string | null;
}
export interface DropdownType {
  selected: Filter;
  setSelected: React.Dispatch<React.SetStateAction<Filter>>;
}

export interface QueryParams {
  [key: string]: any;
}
