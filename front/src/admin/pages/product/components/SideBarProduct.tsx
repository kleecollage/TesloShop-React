import { type ProductFormValues, productSchema } from "@/admin/pages/product/ui/product.schema";
import type { Product } from "@/interfaces/product.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";


interface Props {
  product: Product;
}
export const SideBarProduct = ({product}: Props) => {
    const {
      watch,
      formState: { errors },
    } = useForm<ProductFormValues>({
      resolver: zodResolver(productSchema),
      defaultValues: product,
    });

  const [dragActive, setDragActive] = useState(false);

  const selectedSizes = watch('sizes');
  const currentStock = watch('stock');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  };

  return (
    <>
    {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Product Images
            </h2>

            {/* Drag & Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                <div>
                  <p className="text-lg font-medium text-slate-700">
                    Arrastra las imágenes aquí
                  </p>
                  <p className="text-sm text-slate-500">
                    o haz clic para buscar
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  PNG, JPG, WebP hasta 10MB cada una
                </p>
              </div>
            </div>

            {/* Current Images */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-slate-700">
                Current Images
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                      <img
                        src={image}
                        alt="Product"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <X className="h-3 w-3" />
                    </button>
                    <p className="mt-1 text-xs text-slate-600 truncate">
                      {image}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Status */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Product Status
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">
                  Status
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">
                  Inventory
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    currentStock > 5
                      ? 'bg-green-100 text-green-800'
                      : currentStock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {currentStock} -
                  {currentStock > 5
                    ? 'On stock'
                    : currentStock > 0
                    ? 'Stock Lock'
                    : 'No Stock!'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">
                  Images
                </span>
                <span className="text-sm text-slate-600">
                  {product.images.length} images
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">
                  Available Sizes
                </span>
                <span className="text-sm text-slate-600">
                  {selectedSizes.length} Sizes
                </span>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}