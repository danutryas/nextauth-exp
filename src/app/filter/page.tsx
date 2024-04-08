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

const FilterPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();

  const [selected, setSelected] = useState<{ [key: string]: Filter }>({
    name: {
      id: 0,
      menu: "Danu",
    },
    midName: {
      id: 1,
      menu: "Tryas",
    },
    lastName: {
      id: 2,
      menu: "Pristowo",
    },
  });

  const onSelect = () => {
    const params: { [key: string]: any } = {};
    Object.keys(selected).forEach((key) => {
      params[key] = selected[key].menu;
    });

    router.push(pathname + createParams(params));
  };

  useEffect(() => {
    const name = getParams(params, "name");
    if (name) console.log(name);
  }, []);

  return (
    <div className="">
      {/* <Dropdown selected={selected} setSelected={setSelected} /> */}
      <Button onClick={onSelect}>search</Button>
    </div>
  );
};

export default FilterPage;
