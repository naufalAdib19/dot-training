import { ProductType } from "@/app/(authenticated)/product/_types/product-type";

type SortAndFilterParamsType = {
  userSearch: string;
  isSorting: boolean;
  data: ProductType[] | undefined;
};

export const sortAndFilter = (
  params: SortAndFilterParamsType
): ProductType[] => {
  if (!params.data) {
    return [];
  }
  return params.data
    .filter(
      (val: ProductType) =>
        val.name.toLowerCase().includes(params.userSearch.toLowerCase()) ||
        val.accountCode.toLowerCase().includes(params.userSearch.toLowerCase())
    )
    .sort((a, b) => (params.isSorting ? a.price - b.price : 0));
};
