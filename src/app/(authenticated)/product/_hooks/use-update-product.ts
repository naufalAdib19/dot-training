import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";
import { listProductType } from "../_types/listProductType";
import { message } from "antd";

type UseUpdateProductParamsType = {
  id: string;
};

export const useUpdateProduct = ({ id }: UseUpdateProductParamsType) => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: listProductType) => {
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
