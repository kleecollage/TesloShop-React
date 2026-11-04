import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { ProductForm } from '@/admin/pages/product/ui/ProductForm';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { id } = useParams();
  const { isLoading, isError, data: product, productMutation } = useProduct(id || '');
  const navigate = useNavigate()

  const title = id === 'new' ? 'New Product' : 'Update Product';
  const subTitle = id === 'new'
      ? 'Here you can create a new product.'
      : 'Here you can update the product.';

  const handleSubmit = async (productLike: Partial<Product>) => {
    await productMutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Product updated successfully!', {
          position: 'top-right'
        });
        navigate(`/admin/products/${data.id}`)
      },
      onError: (error) => {
        console.log(error);
        toast.error('Error updating the product :(')
      }
    })
  }

  if(isError) return <Navigate to='/admin/products' />;

  if(isLoading) return <CustomFullScreenLoading />;

  if(!product) return <Navigate to='/admin/products' /> ;

  return (
  <ProductForm
    title={title}
    subTitle={subTitle}
    product={product}
    onSubmit={handleSubmit}
    isPosting={productMutation.isPending}
  />
)
};