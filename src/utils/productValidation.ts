import { z } from "zod";

export const productSchema = z.object({
  code: z.string().min(5, "Product code must be at least 5 character long"),
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price can't zero"),
  accountCode: z.string().min(1, "Account Code is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
});

export type ProductType = z.infer<typeof productSchema>;
