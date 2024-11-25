"use client";
import { axiosInstance } from "@/libs/axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { listProductType } from "../_types/listProductType";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateProduct = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: listProductType) => {
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
