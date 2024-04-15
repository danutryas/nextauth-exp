"use client";

import Dropdown from "@/components/dropdown/dropdown";
import { key } from "@/lib/objects";
import { createParams, getParams } from "@/lib/params";
import { Filter } from "@/types/filter";
import { Button } from "antd";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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

const FilterPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [selected, setSelected] = useState<{ [key: string]: Filter | null }>({
    name: null,
    midName: null,
    lastName: null,
  });

  const onSelect = () => {
    // const loc = pathname + createParams(selected);
    // window.location.href = loc;
  };

  const onChangeInput = (e: any) => {
    setSelected((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const name = getParams(params, "name");
    if (name) console.log(name);
  }, []);

  const setValue = (key: string, value: Filter) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div>
      <Dropdown
        selected={selected.name}
        setSelected={setValue}
        name="name"
        menu={menu}
      />
      <Dropdown
        selected={selected.midName}
        setSelected={setValue}
        name="midName"
        menu={menu}
      />
      <input
        type="text"
        name="lastName"
        id=""
        onChange={(e) => onChangeInput(e)}
      />
      <Button onClick={onSelect}>search</Button>
    </div>
  );
};

export default FilterPage;
