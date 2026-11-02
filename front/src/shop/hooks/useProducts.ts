import { getProductsAction } from "@/shop/actions/get-products.action";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {

  // TODO: Logica

  return useQuery({
    queryKey: ['products'],
    queryFn: getProductsAction,
  });
}