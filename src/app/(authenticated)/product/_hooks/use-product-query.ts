"use client";
import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../_types/product-type";
import { message } from "antd";

export const useProductQuery = () => {
  return useQuery({
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get<ProductType[]>("/products");
        return resp;
      } catch (error) {
        message.error("Error occurs when fetching the data");
      }
      return null;
    },
    queryKey: ["listProduct"],
    refetchOnWindowFocus: false,
  });
};
