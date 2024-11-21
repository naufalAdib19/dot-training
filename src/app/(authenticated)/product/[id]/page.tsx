"use client";
import React from "react";
import { useProductDetailQuery } from "../_hooks/useProductDetailQuery";
import { message, Divider, Skeleton } from "antd";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useProductDetailQuery(params.id, () => {
    messageApi.open({
      type: "error",
      content: "Something wrong happen during get the data",
    });
  });

  return (
    <div className="bg-white rounded-lg p-[24px]">
      {contextHolder}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div>
          <p className="text-2xl font-bold uppercase">{data?.data.name}</p>
          <p>
            <i>Rp {data?.data.price}</i>
          </p>
          <Divider />
          <div>
            <p className="text-lg">{data?.data.description}</p>
            <p>
              <b>Code : </b>
              {data?.data.code}
            </p>
            <p>
              <b>Account Code: </b>
              {data?.data.accountCode}
            </p>
          </div>
          <Divider />
          <p className="px-2 py-1 rounded bg-blue-50 border border-blue-500 w-fit mt-2 uppercase">
            {data?.data.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
