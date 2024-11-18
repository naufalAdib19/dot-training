"use client";
import React from "react";
import { useProductQuery } from "./_hooks/useProductQuery";
import TableData from "./_components/TableData/TableData";
import { Button, Input } from "antd";
import { SortAscendingOutlined, SearchOutlined } from "@ant-design/icons";

const ListPage = () => {
  const { data } = useProductQuery();

  return (
    <div>
      <div className="mb-3 flex items-center gap-x-2">
        <Button
          variant="outlined"
          color="default"
          icon={<SortAscendingOutlined />}
          iconPosition="start"
        >
          Sort
        </Button>
        <Input
          size="middle"
          placeholder="search"
          prefix={<SearchOutlined />}
        ></Input>
      </div>
      <TableData data={data?.data} />
    </div>
  );
};

export default ListPage;
