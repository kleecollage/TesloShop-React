import { getProductsAction } from "@/shop/actions/get-products.action";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 9;
const STALE_TIME_MS = 1000 * 60 * 5;

export const toPositiveInt = (value: string | null, fallback: number): number => {
  const parsed = Number(value);
  return value !== null && Number.isInteger(parsed) && parsed >= 1 ? parsed : fallback;
};

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();

  const page = toPositiveInt(searchParams.get('page'), DEFAULT_PAGE);
  const limit = toPositiveInt(searchParams.get('limit'), DEFAULT_LIMIT);
  const offset = (page - 1) * limit;

  const sizes = searchParams.get('sizes');
  const price = searchParams.get('prices') || 'any';
  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case 'any':
      minPrice = undefined;
      maxPrice = undefined;
      break;
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
      break;
    case '50-100':
      minPrice = 50;
      maxPrice = 100;
      break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;
    case '200+':
      minPrice = 200;
      maxPrice = undefined;
      break;
    default:
      minPrice = undefined;
      maxPrice = undefined;
      break;
  }


  return useQuery({
    queryKey: ['products', { offset, limit, sizes, gender, minPrice, maxPrice }],
    queryFn: () => getProductsAction({ limit, offset, sizes, gender, minPrice, maxPrice }),
    staleTime: STALE_TIME_MS,
  });
};
