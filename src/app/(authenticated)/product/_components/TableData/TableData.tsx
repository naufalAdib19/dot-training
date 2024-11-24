"use client";
import React, { useState } from "react";
import { Button, Table, Modal } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { listProductType } from "../../_types/listProductType";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteProduct } from "../../_hooks/useDeleteProduct";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const rowSelection: TableProps<listProductType>["rowSelection"] = {
  getCheckboxProps: (record: listProductType) => ({
    name: record.name,
  }),
};

const TableData = ({ data }: { data: listProductType[] | undefined }) => {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState<
    Record<string, any>
  >({
    name: "",
    id: 0,
  });
  const { mutate, isPending } = useDeleteProduct({
    onError: () => {
      messageApi.open({
        type: "error",
        content: `Something wrong happen when delete ${currentSelectedProduct.name}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listProduct"],
      });
      messageApi
        .open({
          type: "success",
          content: `Success delete ${currentSelectedProduct.name}`,
          duration: 1.2,
        })
        .then(() => {
          setIsModalShow(false);
        });
    },
  });
  const column: TableColumnsType<listProductType> = [
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Name",
      render: (val) => (
        <p
          className="cursor-pointer"
          onClick={() => {
            router.push(`/product/${val.id}`);
          }}
        >
          {val.name}
        </p>
      ),
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
      render: (val, record) => (
        <div className="flex items-center gap-x-2">
          <EditOutlined
            className="hover:cursor-pointer"
            style={{ color: "blue", marginRight: "8px" }}
            onClick={() => {
              router.push(`product/${val.id}/update`);
            }}
          />
          |
          <DeleteOutlined
            className="hover:cursor-pointer ml-2"
            style={{ color: "red" }}
            onClick={() => {
              setIsModalShow(true);
              setCurrentSelectedProduct({
                id: val.id,
                name: val.name,
              });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Table<listProductType>
        rowSelection={{ ...rowSelection }}
        columns={column}
        dataSource={data}
        rowKey={(row) => row.code}
        scroll={{ x: "max-content" }}
        style={{ overflowX: "auto" }}
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        title="DELETE MATERIAL"
        open={isModalShow}
        okText="Delete"
        okButtonProps={{
          variant: "solid",
          color: "danger",
          icon: <DeleteOutlined />,
          disabled: isPending,
        }}
        onOk={() => {
          mutate(currentSelectedProduct.id);
        }}
        onCancel={() => {
          setIsModalShow(false);
        }}
      >
        Are you sure want to delete {currentSelectedProduct.name}?
      </Modal>
    </div>
  );
};

export default TableData;
