"use client";
import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

type useProductQueryParamsType = {
  onError?: () => void;
};

export const useProductQuery = ({ onError }: useProductQueryParamsType) => {
  return useQuery({
    queryFn: async () => {
      try {
        const resp = await axiosInstance("/products");
        return resp;
      } catch (error) {
        if (onError) {
          onError();
        }
      }
      return null;
    },
    queryKey: ["listProduct"],
    refetchOnWindowFocus: false,
  });
};
