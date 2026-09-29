import { formatProductCount } from "../utils/formatProductCount";

const queryValues = {
  all: null,
  honey: "miody",
  "bee-product": "produkty-pszczele",
} as const;

type Filter = keyof typeof queryValues;

document
  .querySelectorAll<HTMLElement>("[data-product-catalog]")
  .forEach((catalog) => {
    const filters = [
      ...catalog.querySelectorAll<HTMLButtonElement>("[data-product-filter]"),
    ];
    const cards = [
      ...catalog.querySelectorAll<HTMLElement>("[data-product-category]"),
    ];
    const count = catalog.querySelector<HTMLElement>("[data-product-count]");
    const emptyMessage = catalog.querySelector<HTMLElement>(
      "[data-empty-products]",
    );
    if (filters.length === 0 || cards.length === 0) return;

    const getFilterFromUrl = (): Filter => {
      const category = new URLSearchParams(window.location.search).get(
        "kategoria",
      );
      return (
        (Object.entries(queryValues).find(
          ([, value]) => value === category,
        )?.[0] as Filter | undefined) ?? "all"
      );
    };

    const applyFilter = (filter: Filter) => {
      let visibleCount = 0;
      cards.forEach((card) => {
        const visible =
          filter === "all" || card.dataset.productCategory === filter;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
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
      const value = queryValues[filter];
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
