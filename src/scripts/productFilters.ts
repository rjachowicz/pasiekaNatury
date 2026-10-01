import { formatProductCount } from "../utils/formatProductCount";
import { productCategories, type ProductCategory } from "../data/products";

const queryValues = new Map<ProductCategory | "all", string | null>([
  ["all", null],
  ...productCategories.map(({ id, slug }) => [id, slug] as const),
]);

type Filter = ProductCategory | "all";

document
  .querySelectorAll<HTMLElement>("[data-product-catalog]")
  .forEach((catalog) => {
    const filters = [
      ...catalog.querySelectorAll<HTMLButtonElement>("[data-product-filter]"),
    ];
    const groups = [
      ...catalog.querySelectorAll<HTMLElement>("[data-product-group]"),
    ];
    const count = catalog.querySelector<HTMLElement>("[data-product-count]");
    const emptyMessage = catalog.querySelector<HTMLElement>(
      "[data-empty-products]",
    );
    if (filters.length === 0 || groups.length === 0) return;

    const getFilterFromUrl = (): Filter => {
      const category = new URLSearchParams(window.location.search).get(
        "kategoria",
      );
      return (
        ([...queryValues.entries()].find(
          ([, value]) => value === category,
        )?.[0] as Filter | undefined) ?? "all"
      );
    };

    const applyFilter = (filter: Filter) => {
      let visibleCount = 0;
      groups.forEach((group) => {
        const visible =
          filter === "all" || group.dataset.productGroup === filter;
        group.hidden = !visible;
        if (visible) {
          visibleCount += group.querySelectorAll(
            "[data-product-category]",
          ).length;
        }
      });

      filters.forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.productFilter === filter),
        );
      });

      if (count) count.textContent = formatProductCount(visibleCount);
      if (emptyMessage) {
        emptyMessage.hidden = filter === "all" || visibleCount > 0;
      }
    };

    const updateUrl = (filter: Filter) => {
      const url = new URL(window.location.href);
      const value = queryValues.get(filter);
      if (value) url.searchParams.set("kategoria", value);
      else url.searchParams.delete("kategoria");
      history.pushState({}, "", url);
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.productFilter as Filter;
        applyFilter(filter);
        updateUrl(filter);
      });
    });

    applyFilter(getFilterFromUrl());
    window.addEventListener("popstate", () => applyFilter(getFilterFromUrl()));
  });
