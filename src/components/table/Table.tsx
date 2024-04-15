import { Table as AntTable, TableProps } from "antd";

interface Table extends TableProps {}

const Table: React.FC<Table> = (props) => {
  const columns = [
    // {
    //   title: "Id",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return <AntTable {...props} columns={columns} rowKey="id" />;
};

export default Table;
