import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useParams } from "react-router"

export const GenderPage = () => {
  const { gender } = useParams();
  const genderLabel = gender === 'men' ? 'Men' : gender === 'women' ? 'Women' : 'Kids';

  return (
    <>
      <CustomJumbotron title={`Products for ${genderLabel}`} subTitle={''} />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={5}/>
    </>
  )
}
