import { getProductsAction } from "@/shop/actions/get-products.action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export const useProducts = () => {

  // TODO: Logica
  const [ searchParams ] = useSearchParams ()
  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 9;
  const offset = (Number(page) - 1) * Number(limit);


  return useQuery({
    queryKey: ['products', { offset, limit }],
    queryFn: () => getProductsAction({
      limit: isNaN(+limit) ? 9 : +limit,
      offset: isNaN(+offset) ? 0 : +offset
    }),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}