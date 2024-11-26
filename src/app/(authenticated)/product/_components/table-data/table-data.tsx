"use client";
import React, { useState } from "react";
import { Table, Modal } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ProductType } from "../../_types/product-type";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteProduct } from "../../_hooks/use-delete-product";
import { useRouter } from "next/navigation";

const rowSelection: TableProps<ProductType>["rowSelection"] = {
  getCheckboxProps: (record: ProductType) => ({
    name: record.name,
  }),
};

const TableData = ({ data }: { data: ProductType[] | undefined }) => {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const router = useRouter();
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState<
    Record<string, any>
  >({
    name: "",
    id: 0,
  });
  const { mutate, isPending } = useDeleteProduct({
    closeModalAfterSuccessDelete: () => {
      setIsModalShow(false);
    },
  });
  const column: TableColumnsType<ProductType> = [
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
    <>
      <Table<ProductType>
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
    </>
  );
};

export default TableData;
