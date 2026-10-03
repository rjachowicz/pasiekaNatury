export type ProductCategory = "honey" | "bee-product" | "herbal-honey";

export interface ProductCategoryDefinition {
  id: ProductCategory;
  label: string;
  slug: string;
}

export const productCategories = [
  { id: "honey", label: "Miody", slug: "miody" },
  {
    id: "bee-product",
    label: "Produkty pszczele",
    slug: "produkty-pszczele",
  },
  { id: "herbal-honey", label: "Ziołomiody", slug: "ziolomiody" },
] as const satisfies readonly ProductCategoryDefinition[];

export const productCategoryLabels = Object.fromEntries(
  productCategories.map(({ id, label }) => [id, label]),
) as Record<ProductCategory, string>;
