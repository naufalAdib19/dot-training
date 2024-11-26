import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../_types/product-type";
import { message } from "antd";

export const useProductDetailQuery = (id: string) => {
  return useQuery({
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get<ProductType>("/products/" + id);
        return resp;
      } catch (e) {
        message.error("Error occurs when get the data from server");
      }
      return null;
    },
    queryKey: ["productDetail"],
    refetchOnWindowFocus: false,
  });
};
