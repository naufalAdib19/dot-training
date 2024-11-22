"use client";
import React, { useEffect } from "react";
import { useProductDetailQuery } from "../../_hooks/useProductDetailQuery";
import { useForm, Controller } from "react-hook-form";
import { ProductType, productSchema } from "@/utils/productValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, InputNumber, message, Skeleton } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useUpdateProduct } from "../../_hooks/use-update-product";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useProductDetailQuery(params.id, () => {
    messageApi.open({
      type: "error",
      content: "Error occurs when get the data from the server",
    });
  });
  const { mutate, isPending } = useUpdateProduct({
    id: params.id,
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Error occurs when updating the data",
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Success updating the data",
      });
    },
  });
  const [messageApi, contextHolder] = message.useMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });
  const onSubmit = (data: ProductType) => {
    mutate(data);
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.data.name);
      setValue("accountCode", data.data.accountCode);
      setValue("price", data.data.price);
      setValue("description", data.data.description);
      setValue("status", data.data.status);
      setValue("code", data.data.code);
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      {contextHolder}
      <Form
        className="grid grid-cols-1 md:grid-cols-2 gap-x-7 bg-white p-[24px] rounded-lg"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Code"
          validateStatus={errors.code && "error"}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter product code"
                onChange={onChange}
                value={value}
                size="large"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          validateStatus={errors.name && "error"}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter product name"
                onChange={onChange}
                value={value}
                size="large"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          validateStatus={errors.price && "error"}
          help={errors.price?.message}
        >
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputNumber
                min={1}
                placeholder="Enter product price"
                style={{ width: "100%" }}
                onChange={onChange}
                value={value}
                size="large"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Account Code"
          validateStatus={errors.accountCode && "error"}
          help={errors.accountCode?.message}
        >
          <Controller
            name="accountCode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter product account code"
                onChange={onChange}
                value={value}
                size="large"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          validateStatus={errors.description && "error"}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter product description"
                onChange={onChange}
                value={value}
                size="large"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          validateStatus={errors.status && "error"}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter product status"
                onChange={onChange}
                value={value}
                size="large"
              />
            )}
          />
        </Form.Item>
        <Form.Item className="text-end md:col-span-2">
          <Button
            variant="solid"
            color="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            size="large"
            loading={isPending}
          >
            Update Material
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePage;
