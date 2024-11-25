import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";
import { message } from "antd";

interface IUseDeleteProduct {
  closeModalAfterSuccessDelete: () => void;
}

export const useDeleteProduct = ({
  closeModalAfterSuccessDelete,
}: IUseDeleteProduct) => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const resp = await axiosInstance.delete(`/products/${id}`);
      return resp;
    },
    onError: () => {
      message.error("Error occurs when delete the data");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listProduct"],
      });
      message
        .success({
          content: "Success delete the data",
          duration: 1.2,
        })
        .then(() => {
          closeModalAfterSuccessDelete();
        });
    },
  });
};
