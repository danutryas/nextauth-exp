"use client";
import Dropdown from "@/components/dropdown/dropdown";
import { createParams, getParams } from "@/lib/params";
import { Filter, Filters } from "@/types/filter";
import { Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dataSrc from "../../data/inbox.json";
import menus from "../../data/menus.json";
import { filterData } from "@/lib/Filter";

const SessionHandlingPage = () => {
  const [category, setCategory] = useState<Filter[] | null>(null);
  const [filteredData, setFilteredData] = useState<any>();
  const [selected, setSelected] = useState<Filters>({
    category: null,
    keyword: null,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setSelectedValue = (key: string, value: Filter | string | null) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const category = getParams(params, "category");
    const keyword = getParams(params, "keyword");

    const cat = sessionStorage.getItem("categories");

    if (cat) {
      const parsedData = JSON.parse(cat);
      setCategory(parsedData);

      if (keyword) {
        setFilteredData(filterData(dataSrc, null, keyword));
        setSelectedValue("keyword", keyword);
      }

      let filteredDataSrc = dataSrc;
      if (category) {
        const objectData: Filter = parsedData.filter(
          (data: Filter) => data.menu === category
        )[0];
        setSelectedValue("category", objectData);
        filteredDataSrc = filterData(dataSrc, objectData.id, keyword);
      }
      setFilteredData(filterData(filteredDataSrc, null, keyword));
    } else {
      // call category api
      const transformedData = menus.category.map((item) => ({
        id: item.id,
        menu: item.category,
      }));

      setCategory(transformedData);
      sessionStorage.setItem("categories", JSON.stringify(transformedData));

      setFilteredData(filterData(dataSrc, null, keyword));
    }
  }, []);

  const onSelect = () => {
    const filteredData = filterData(
      dataSrc,
      (selected.category as Filter)?.id,
      selected.keyword as string
    );

    setFilteredData(filteredData);

    const loc = pathname + createParams(selected);
    router.push(loc);
    // window.location.href = loc;
  };

  const renderData = (data: { [key: string]: any[] }) => {
    return Object.entries(data).map(([date, items]) => {
      if (items.length === 0) return null; // Don't render anything if there are no items

      return (
        <div key={date}>
          <h2>{date}</h2>
          <ul>
            {items.map((item) => (
              <li key={item.inboxId}>
                <p>Inbox ID: {item.inboxId}</p>
                <p>Description: {item.description}</p>
                <p>Category: {item.categoryId}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <Dropdown
          selected={selected.category as Filter}
          setSelected={setSelectedValue}
          name="category"
          menu={category}
        />
        <input
          type="text"
          name="keyword"
          id=""
          value={(selected.keyword as string) ?? ""}
          onChange={(e) => setSelectedValue(e.target.name, e.target.value)}
        />
        <Button onClick={onSelect}>search</Button>
      </div>
      <div className="">{filteredData && renderData(filteredData)}</div>
    </div>
  );
};
export default SessionHandlingPage;
