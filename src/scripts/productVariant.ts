export {};

document
  .querySelectorAll<HTMLElement>("[data-product-detail]")
  .forEach((productDetail) => {
    const contactLink = productDetail.querySelector<HTMLAnchorElement>(
      "[data-contact-link]",
    );
    const variantInputs = [
      ...productDetail.querySelectorAll<HTMLInputElement>(
        'input[name="product-variant"]',
      ),
    ];
    if (!contactLink || variantInputs.length === 0) return;

    const updateContactLink = () => {
      const selectedVariant = variantInputs.find(
        (input) => input.checked,
      )?.value;
      const url = new URL(contactLink.href);
      if (selectedVariant) url.searchParams.set("wariant", selectedVariant);
      else url.searchParams.delete("wariant");
      contactLink.href = `${url.pathname}${url.search}`;
    };

    variantInputs.forEach((input) =>
      input.addEventListener("change", updateContactLink),
    );
  });
