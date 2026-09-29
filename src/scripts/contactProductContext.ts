export {};

type ProductOption = {
  id: string;
  name: string;
  variants: string[];
};

const parseProductOptions = (value: string | undefined): ProductOption[] => {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as ProductOption[]) : [];
  } catch {
    return [];
  }
};

document
  .querySelectorAll<HTMLElement>("[data-contact-product-context]")
  .forEach((contextualBox) => {
    const productName = contextualBox.querySelector<HTMLElement>(
      "[data-product-name]",
    );
    if (!productName) return;

    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get("produkt");
    const variant = searchParams.get("wariant");
    const productOptions = parseProductOptions(contextualBox.dataset.products);
    const product = productOptions.find(({ id }) => id === productId);
    if (!product) return;

    const validVariant =
      variant && product.variants.includes(variant) ? variant : null;
    productName.textContent = `Pytasz o: ${product.name}${
      validVariant ? ` — ${validVariant}` : ""
    }`;
    contextualBox.hidden = false;
  });
