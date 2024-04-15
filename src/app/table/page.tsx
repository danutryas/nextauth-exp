"use client";
import Table from "@/components/table/Table";
import { useQuery } from "@tanstack/react-query";
import { TablePaginationConfig } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import menus from "../../data/menus.json";

const TablePage = () => {
  const [data, setData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [body, setBody] = useState<{
    status: number[];
    product: number[];
    keyword: string;
  }>({
    status: [],
    product: [],
    keyword: "",
  });

  const [config, setConfig] = useState<{
    pageSize: number;
    total: number | null;
  }>({
    pageSize: 10,
    total: 0,
  });

  const onChange = (e: TablePaginationConfig) => {
    // console.log(e);
    setCurrPage(Number(e.current));
  };

  const onSearch = () => {
    //
  };

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      page: currPage,
    }));

    setBody((prev) => ({
      ...prev,
      page: currPage,
    }));
  }, [currPage]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${10}&skip=${(currPage - 1) * 10}`
      );
      setData(() => response.data.products);
      setIsLoading(false);
      return response.data.total;
    };

    const total = fetchData();
    if (!config.total) {
      total.then((totalData) => {
        setConfig((prev) => ({ ...prev, total: totalData }));
      });
    }
  }, [currPage]);

  return (
    <div className="">
      <Table
        dataSource={data}
        loading={isLoading}
        pagination={{ pageSize: 10, total: config.total ?? 0 }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
export default TablePage;
