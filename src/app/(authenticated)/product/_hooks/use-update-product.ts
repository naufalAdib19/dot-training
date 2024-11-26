import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";
import { ProductType } from "../_types/product-type";
import { message } from "antd";

type UseUpdateProductParamsType = {
  id: string;
};

export const useUpdateProduct = ({ id }: UseUpdateProductParamsType) => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductType) => {
      const resp = await axiosInstance.put(`/products/${id}`, data);
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listProduct"],
      });
      message.success("Success edit the material");
    },
    onError: () => {
      message.error("Error occurs when edit the material, please try again");
    },
  });
};
