import { z } from "zod"

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
const GENDERS = ['men', 'women', 'kid', 'unisex'] as const;

export const productSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  price: z.number({ error: 'El precio es obligatorio' }).min(1, 'El precio debe ser mayor a 0'),
  stock: z.number({ error: 'El stock es obligatorio' }).int().min(0, 'El stock no puede ser negativo'),
  slug: z.string().min(1, 'El slug es obligatorio').regex(/^\S+$/, 'El slug no puede tener espacios'),
  gender: z.enum(GENDERS),
  description: z.string().min(1, 'La descripción es obligatoria'),
  sizes: z.array(z.enum(SIZES)).min(1, 'Selecciona al menos una talla'),
  tags: z.array(z.string()),
  images: z.array(z.string()),
});

export type ProductFormValues = z.infer<typeof productSchema>;