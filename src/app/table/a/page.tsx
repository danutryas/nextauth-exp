"use client";
import Table from "@/components/table/Table";
import { useQuery } from "@tanstack/react-query";
import { TablePaginationConfig } from "antd";
import { useState } from "react";

const TablePage = () => {
  const [requestMeta, setRequestMeta] = useState<{
    limit: number | undefined;
    skip: number | undefined;
  }>({ limit: 10, skip: 0 });

  const fetchData = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${requestMeta.limit}&skip=${requestMeta.skip}`
    );
    return response.json();
  };
  const info = useQuery({ queryKey: ["product"], queryFn: fetchData });
  const { data, isPending, isError, isLoading } = info;
  //   console.log(info);
  // console.log("Data:", data);
  // console.log("isPending:", isPending);
  // console.log("isLoading:", isLoading);
  // console.log("isError:", isError);
  const onChange = (e: TablePaginationConfig) => {
    console.log(e);
    setRequestMeta((prev) => ({
      ...prev,
      skip: e.current ? e.current * 10 : 10,
    }));
  };

  return (
    <div className="">
      <Table
        dataSource={data && data.products}
        loading={isLoading}
        pagination={{ pageSize: 10, total: data && data.total }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
  // if (isPending) return <div className="">Loading...</div>;
  // else
  //   return (
  //     <div className="">
  //       <Table data={data.products} />
  //     </div>
  //   );
};
export default TablePage;
