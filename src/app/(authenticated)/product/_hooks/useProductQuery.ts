"use client";
import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useProductQuery = () => {
  return useQuery({
    queryFn: async () => {
      const resp = await axiosInstance("/products");
      return resp;
    },
    queryKey: ["listProduct"],
    refetchOnWindowFocus: false,
  });
};
