import { DropdownType, Filter } from "@/types/filter";
import { Dropdown as AntdDropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";

const menu = [
  {
    id: 1,
    menu: "a",
  },
  {
    id: 2,
    menu: "b",
  },
  {
    id: 3,
    menu: "c",
  },
];

const Dropdown: React.FC<DropdownType> = (props) => {
  const items = menu.map((item) => {
    return {
      key: item.id,
      label: (
        <div className="" onClick={(e) => props.setSelected(item)}>
          <p>{`${item.id}${item.menu} menu item`}</p>
        </div>
      ),
    };
  });

  return (
    <AntdDropdown menu={{ items, selectable: true }} trigger={["click"]}>
      {/* <div className=""></div> */}
      <div className="bg-white text-black py-2 px-4 w-full rounded-md">
        <p>{props.selected.menu ?? ""}</p>
      </div>
    </AntdDropdown>
  );
};

export default Dropdown;
