import { Filter, Filters } from "@/types/filter";
import { Dropdown } from "antd";

interface DropdownType {
  name: string;
  selected: Filter[] | null;
  setSelected: React.Dispatch<React.SetStateAction<Filters>>;
  menu: Filter[] | null;
}

const CheckboxDropdown: React.FC<DropdownType> = (props) => {
  const { selected, setSelected, name, menu } = props;

  const onSelect = (item: Filter) => {
    setSelected((prev) => {
      const itemExists =
        Array.isArray(prev[name]) &&
        (prev[name] as Filter[]).some((existingItem) => {
          return existingItem.id === item.id;
        });

      if (itemExists) {
        return prev;
      }

      return {
        ...prev,
        [name]: Array.isArray(prev[name])
          ? [...(prev[name] as Filter[]), item]
          : prev[name] !== null
          ? [prev[name] as Filter, item]
          : [item],
      };
    });
    console.log(selected);
  };

  const items = menu
    ? menu.map((item) => {
        return {
          key: item.id,
          label: (
            <div className="" onClick={() => onSelect(item)}>
              <p>{`${item.id} : ${item.menu}`}</p>
            </div>
          ),
        };
      })
    : undefined;
  return (
    <Dropdown menu={{ items, selectable: false }} trigger={["click"]}>
      {/* <div className=""></div> */}
      <div className="bg-white text-black py-2 px-4 w-full rounded-md">
        <p>
          {(selected && selected.map((menu) => `${menu.menu}, `)) ??
            `Select ${name}`}
        </p>
      </div>
    </Dropdown>
  );
};
export default CheckboxDropdown;
