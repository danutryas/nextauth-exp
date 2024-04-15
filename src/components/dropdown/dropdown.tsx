import { DropdownType, Filter } from "@/types/filter";
import { Dropdown as AntdDropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";

const Dropdown: React.FC<DropdownType> = (props) => {
  const { selected, setSelected, name, menu } = props;
  const items = menu
    ? menu.map((item) => {
        return {
          key: item.id,
          label: (
            <div className="" onClick={(e) => setSelected(name, item)}>
              <p>{`${item.id} : ${item.menu}`}</p>
            </div>
          ),
        };
      })
    : undefined;

  return (
    <AntdDropdown menu={{ items, selectable: true }} trigger={["click"]}>
      {/* <div className=""></div> */}
      <div className="bg-white text-black py-2 px-4 w-full rounded-md">
        <p>{(selected && selected.menu) ?? `Select ${name}`}</p>
      </div>
    </AntdDropdown>
  );
};

export default Dropdown;
