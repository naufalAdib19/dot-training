"use client";
import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { productSchema, ProductType } from "@/utils/productValidation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, InputNumber, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useCreateProduct } from "../_hooks/use-create-product";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const CreatePage = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const { mutate, isPending } = useCreateProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listProduct"],
      });
      messageApi.open({
        type: "success",
        content: "Success creating the data",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Something wrong happen when create the data",
      });
    },
  });

  const onSubmit = (data: ProductType) => {
    mutate(data);
  };

  return (
    <div>
      {contextHolder}
      <Button
        variant="solid"
        color="primary"
        className="mb-[12px]"
        icon={<LeftOutlined />}
        onClick={() => {
          router.push("/product");
        }}
      >
        Back
      </Button>
      <div className="p-[24px] rounded-lg bg-white">
        <Form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-7"
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
          <span></span>
          <Form.Item className="text-end">
            <Button
              variant="solid"
              color="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              size="large"
              loading={isPending}
            >
              Save Material
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
