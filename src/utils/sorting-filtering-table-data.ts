import { listProductType } from "@/app/(authenticated)/product/_types/listProductType";

type SortAndFilterParamsType = {
  userSearch: string;
  isSorting: boolean;
  data: listProductType[] | undefined;
};

export const sortAndFilter = (
  params: SortAndFilterParamsType
): listProductType[] => {
  if (!params.data) {
    return [];
  }
  return params.data
    .filter(
      (val: listProductType) =>
        val.name.toLowerCase().includes(params.userSearch.toLowerCase()) ||
        val.accountCode.toLowerCase().includes(params.userSearch.toLowerCase())
    )
    .sort((a, b) => (params.isSorting ? a.price - b.price : 0));
};
