"use client";
import { useMemo, useState } from "react";
import { useProductQuery } from "./_hooks/use-product-query";
import TableData from "./_components/table-data/table-data";
import { Button, Input, Select, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { listProductType } from "./_types/listProductType";

const { Title } = Typography;

const ListPage = () => {
  const { data } = useProductQuery({
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Something wrong happen during get the data from server",
      });
    },
  });
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [userSearch, setuserSearch] = useState<string>("");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserSearch(e.target.value);
  };
  const handleSort = (value: boolean) => {
    setIsSorting(value);
  };

  const dataFiltered = useMemo(() => {
    return data?.data
      .filter(
        (val: listProductType) =>
          val.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          val.accountCode.toLowerCase().includes(userSearch.toLowerCase())
      )
      .sort((a, b) => (isSorting ? a.price - b.price : 0));
  }, [data, userSearch, isSorting]);

  return (
    <>
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
          <Select
            style={{ width: 120 }}
            onChange={handleSort}
            options={[
              {
                label: "",
                value: false,
              },
              {
                label: "Price",
                value: true,
              },
            ]}
          />
          <Input
            size="middle"
            placeholder="search name and account code"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
          ></Input>
        </div>
        <TableData data={dataFiltered} />
      </div>
    </>
  );
};

export default ListPage;
