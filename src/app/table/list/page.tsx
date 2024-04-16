"use client";
import Table from "@/components/table/Table";
import { Button, TablePaginationConfig } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import menusData from "../../../data/menus.json";
import { createParams, getParams } from "@/lib/params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, Filters } from "@/types/filter";
import CheckboxDropdown from "@/components/dropdown/MultipleSelect";

interface TableConfig {
  pageSize: number;
  total: number | null;
  isLoading: boolean;
  currPage: number | null;
}
const configInitialValue = {
  pageSize: 10,
  total: null,
  isLoading: false,
  currPage: null,
};

const selectedInitialValue = {
  products: null,
  status: null,
  keyword: null,
  page: null,
};

interface MenusData {
  productMenus: Filter[] | null;
  statusMenus: Filter[] | null;
}
const menusDataInitialValue = {
  productMenus: null,
  statusMenus: null,
};

const TablePage = () => {
  // params
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // table
  const [data, setData] = useState<any>([]);
  const [config, setConfig] = useState<TableConfig>(configInitialValue);
  // filter
  const [selected, setSelected] = useState<Filters>(selectedInitialValue);
  const [menus, setMenus] = useState<MenusData>(menusDataInitialValue);

  const fetchData = async () => {
    setConfig((prev) => ({ ...prev, isLoading: true }));
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${10}&skip=${
        (Number(selected.page) - 1) * 10
      }`
    );
    setData(response.data.products);

    if (!config.total) {
      setConfig((prev) => ({ ...prev, total: response.data.total }));
    }
    setConfig((prev) => ({ ...prev, isLoading: false }));
  };

  const onPageChange = (e: TablePaginationConfig) => {
    const page = Number(e.current);
    setConfig((prev) => ({ ...prev, currPage: page }));
    setSelectedValue("page", page !== 1 ? page.toString() : null);
  };

  // filter
  const setSelectedValue = (
    key: string,
    value: Filter[] | Filter | string | null
  ) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  const onSelect = () => {
    // set filter
    const location = pathname + createParams(selected);
    router.push(location);
    // fetch after filter
    fetchData();
    console.log("selected");
  };

  useEffect(() => {
    if (config.currPage) onSelect(); // initial currPage is null
  }, [config.currPage]);

  useEffect(() => {
    let productList: Filter[] = []; // set product list global useEffect
    let statusList: Filter[] = []; // set product list global useEffect

    // get product list
    const prod = sessionStorage.getItem("products");
    if (prod) {
      // if products exist on session storage
      productList = JSON.parse(prod);
      setMenus((prev) => ({ ...prev, productMenus: productList }));
    } else {
      // <<-- get product list -->>
      const transformedData = menusData.products.map((item) => ({
        id: item.id,
        menu: item.title,
      }));

      setMenus((prev) => ({ ...prev, productMenus: transformedData }));

      sessionStorage.setItem("products", JSON.stringify(transformedData));
    }
    // get status list
    const stat = sessionStorage.getItem("status");
    if (stat) {
      // if products exist on session storage
      statusList = JSON.parse(stat);
      setMenus((prev) => ({ ...prev, statusMenus: statusList }));
    } else {
      // <<-- get status list -->>
      const transformedData = menusData.integrationStatus.map((item) => ({
        id: item.id,
        menu: item.title,
      }));

      setMenus((prev) => ({ ...prev, statusMenus: transformedData }));

      sessionStorage.setItem("status", JSON.stringify(transformedData));
    }

    // set selected product
    const productParams = getParams(params, "products");
    if (productParams) {
      const selectedProductParams = productParams.split(",");
      const selectedProducts = productList.filter((product: any) =>
        selectedProductParams.includes(product.id.toString())
      );
      setSelectedValue("products", selectedProducts);
    }
    // set selected status
    const statusParams = getParams(params, "status");
    if (statusParams) {
      const selectedStatusParams = statusParams.split(",");
      const selectedStatus = productList.filter((product: any) =>
        selectedStatusParams.includes(product.id.toString())
      );
      setSelectedValue("status", selectedStatus);
    }
    // set selected keyword
    const keyword = getParams(params, "keyword");
    if (keyword) setSelectedValue("keyword", keyword);
    // set selected page (if page doesn't exist will be null)
    const page = getParams(params, "page");
    setSelectedValue("page", page);
    setConfig((prev) => ({ ...prev, currPage: Number(page) ?? 1 }));
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="">
        <CheckboxDropdown
          menu={menus.productMenus}
          name="products"
          selected={selected.products as Filter[]}
          setSelected={setSelected}
        />
        <CheckboxDropdown
          menu={menus.statusMenus}
          name="status"
          selected={selected.status as Filter[]}
          setSelected={setSelected}
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
      <div className="">
        <Table
          dataSource={data}
          loading={config.isLoading}
          pagination={{
            pageSize: 10,
            total: config.total ?? 0,
            current: config.currPage as number,
          }}
          onChange={(e) => onPageChange(e)}
        />
      </div>
    </div>
  );
};
export default TablePage;
