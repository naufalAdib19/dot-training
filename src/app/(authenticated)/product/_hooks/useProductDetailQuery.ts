import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { listProductType } from "../_types/listProductType";

export const useProductDetailQuery = (id: string, onError: () => void) => {
  return useQuery({
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get<listProductType>(
          "/products/" + id
        );
        return resp;
      } catch (e) {
        onError();
      }
      return null;
    },
    queryKey: ["productDetail"],
    refetchOnWindowFocus: false,
  });
};
