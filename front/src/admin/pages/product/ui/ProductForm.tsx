import { AdminTitle } from "@/admin/components/AdminTitle";
import { SideBarProduct } from "@/admin/pages/product/components/SideBarProduct";
import { productSchema, type ProductFormValues } from "@/admin/pages/product/ui/product.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Product, Size } from "@/interfaces/product.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import { Plus, SaveAll, Tag, X } from "lucide-react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";

interface Props {
  title: string;
  subTitle: string;
  product: Product;
  isPosting: boolean;

  // Methods
  onSubmit: (productLike: Partial<Product>) => Promise<void>;
}

const availableSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const GENDER_VALUES = [
  { label: "Select a fruit", value: null },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kid", value: "kid" },
  { label: "Unisex", value: "unisex" }
]

export const ProductForm = ({ title, subTitle, product, isPosting, onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  const labelInputRef = useRef<HTMLInputElement>(null)

  const selectedSizes = watch('sizes');
  const selectedTags = watch('tags');

  const addTag = () => {
    const newTag = labelInputRef.current!.value;
    const newTagSet = new Set(getValues('tags'));
    console.log(newTag)
    newTagSet.add(newTag);
    setValue('tags', Array.from(newTagSet));
  };

  const removeTag = (tag: string) => {
    const tagSet = new Set(getValues('tags'));
    tagSet.delete(tag);
    setValue('tags', Array.from(tagSet))
  };

  const addSize = (size: Size) => {
    const sizeSet = new Set(getValues('sizes'));
    sizeSet.add(size);
    setValue('sizes', Array.from(sizeSet))
  };

  const removeSize = (size: Size) => {
    const sizeSet = new Set(getValues('sizes'));
    sizeSet.delete(size);
    setValue('sizes', Array.from(sizeSet))
  };


  return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex justify-between items-center">
      <AdminTitle title={title} subTitle={subTitle} />
      <div className="flex justify-end mb-10 gap-4">
        <Button variant="outline" type="button">
          <Link to="/admin/products" className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Cancel
          </Link>
        </Button>

        <Button type="submit" disabled={isPosting}>
          <SaveAll className="w-4 h-4"/>
          Save Changes
        </Button>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Product Info
            </h2>

            <div className="space-y-6">
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Product Title</FieldLabel>
                    <Input {...field} id="title" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                  name="price"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="price">Price ($)</FieldLabel>
                      <Input
                        {...field}
                        id="price"
                        type="number"
                        placeholder="Product Price"
                        value={Number.isNaN(field.value) ? '' : field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="stock"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="stock">Product Stock</FieldLabel>
                      <Input
                        {...field}
                        id="stock"
                        type="number"
                        placeholder="Stock Available"
                        value={Number.isNaN(field.value) ? '' : field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="slug"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="slug">Product Slug</FieldLabel>
                    <Input
                      {...field}
                      id="slug"
                      type="text"
                      placeholder="Product Slug"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="gender">Product Gender</FieldLabel>
                    <Select
                      items={GENDER_VALUES}
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger
                        id="gender"
                        aria-invalid={fieldState.invalid}
                        onBlur={field.onBlur}
                        className="w-full px-4 py-3 border border-input rounded-lg bg-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          {GENDER_VALUES.map((gender) =>(
                            <SelectItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Product Description</FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      rows={5}
                      placeholder="Product Description"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Available Sizes</h2>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <span
                    key={size}
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200",
                      { 'hidden': !selectedSizes.includes(size) }
                    )}
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => removeSize(size)}
                      className={cn(
                        "cursor-pointer ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200",
                        { 'hidden': !selectedSizes.includes(size) }
                      )}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                <span className="text-sm text-slate-600 mr-2">Add sizes:</span>
                {availableSizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => addSize(size)}
                    disabled={getValues('sizes').includes(size)}
                    className={
                      cn(`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedSizes.includes(size)
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer'
                      }`)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Tags</h2>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="cursor-pointer ml-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  ref={labelInputRef}
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === ','){
                      e.preventDefault()
                      addTag()
                      labelInputRef.current!.value = ''
                    }
                  }}
                  placeholder="Add a new tag..."
                  className={cn(
                    "flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                  )}
                />
                <Button
                type='button'
                onClick={() => addTag()}
                className="px-4 py-2rounded-lg ">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <SideBarProduct product={product}/>
      </div>
    </div>
  </form>
  );
}
