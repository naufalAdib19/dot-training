import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";
import { listProductType } from "../_types/listProductType";

type UseUpdateProductParamsType = {
  id: string;
  onSuccess: () => void;
  onError: () => void;
};

export const useUpdateProduct = ({
  id,
  onSuccess,
  onError,
}: UseUpdateProductParamsType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: listProductType) => {
      const resp = await axiosInstance.put(`/products/${id}`, data);
      return resp;
    },
    onSuccess,
    onError,
  });
};
