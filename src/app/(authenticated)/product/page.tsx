"use client";
import React, { useEffect } from "react";
import { useProductQuery } from "./_hooks/useProductQuery";
import TableData from "./_components/TableData/TableData";
import { Button, Input, Typography } from "antd";
import {
  SortAscendingOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { message } from "antd";

const { Title } = Typography;

const ListPage = () => {
  const { data, isError } = useProductQuery({
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Something wrong happen during get the data from server",
      });
    },
  });
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div>
      {contextHolder}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Title level={2}>Material</Title>
        <Button
          color="primary"
          size="large"
          variant="solid"
          icon={<PlusOutlined />}
          onClick={() => {
            router.push("/product/create");
          }}
        >
          Create Material
        </Button>
      </div>
      <div className="bg-white p-[24px] rounded-lg">
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
    </div>
  );
};

export default ListPage;
