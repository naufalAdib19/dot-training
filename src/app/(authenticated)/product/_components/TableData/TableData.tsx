"use client";
import React from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { listProductType } from "../../_types/listProductType";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const column: TableColumnsType<listProductType> = [
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Account Code",
    dataIndex: "accountCode",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (val, record) => (
      <p className="uppercase text-xs text-blue-500 border border-blue-500 bg-blue-50 w-fit px-2 py-1 rounded">
        {val}
      </p>
    ),
  },
  {
    title: "Action",
    render: (_, record) => (
      <span>
        <EditOutlined
          className="hover:cursor-pointer"
          style={{ color: "blue", marginRight: "8px" }}
        />
        <DeleteOutlined
          className="hover:cursor-pointer"
          style={{ color: "red" }}
        />
      </span>
    ),
  },
];

const rowSelection: TableProps<listProductType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: listProductType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: listProductType) => ({
    name: record.name,
  }),
};

const TableData = ({ data }: { data: listProductType[] }) => {
  return (
    <div>
      <Table<listProductType>
        rowSelection={{ ...rowSelection }}
        columns={column}
        dataSource={data}
        rowKey={(row) => row.code}
      />
    </div>
  );
};

export default TableData;
