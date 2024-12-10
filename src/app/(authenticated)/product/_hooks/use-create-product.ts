"use client";
import { axiosInstance } from "@/libs/axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { ProductType } from "../_types/product-type";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateProduct = () => {
  const queryClient: QueryClient = useQueryClient();
  const nullableVariable = null;
  return useMutation({
    mutationFn: async (data: ProductType) => {
      const resp = await axiosInstance.post("/products", data);
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listProduct"],
      });
      message.success("Success create new material!");
    },
    onError: () => {
      message.error("Error occurs when create new material");
    },
  });
};
