import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";

type UseDeleteProductType = {
  onSuccess: () => void;
  onError: () => void;
};

export const useDeleteProduct = ({
  onError,
  onSuccess,
}: UseDeleteProductType) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const resp = await axiosInstance.delete(`/products/${id}`);
      return resp;
    },
    onError,
    onSuccess,
  });
};
