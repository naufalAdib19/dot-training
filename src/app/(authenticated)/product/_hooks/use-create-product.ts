"use client";
import { axiosInstance } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { listProductType } from "../_types/listProductType";

type useCreateProductParamsType = {
  onSuccess: () => void;
  onError?: () => void;
};

export const useCreateProduct = ({
  onSuccess,
  onError,
}: useCreateProductParamsType) => {
  return useMutation({
    mutationFn: async (data: listProductType) => {
      const resp = await axiosInstance.post("/products", data);
      return resp;
    },
    onSuccess,
    onError,
  });
};
